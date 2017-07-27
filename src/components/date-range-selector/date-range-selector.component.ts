import {Component, Input, ElementRef} from '@angular/core';
import {DateRange} from './date-range';
import * as moment from 'moment';

const WEEK = [0, 1, 2, 3, 4, 5, 6];

interface Day {
    number: number;
    currentMonth: boolean;
    selected: boolean;
    date: moment.Moment;
    firstSelected: boolean;
    lastSelected: boolean;
}

@Component({
    selector: 'ax-date-range-selector',
    templateUrl: './date-range-selector.html',
    styles: [ require('./_date-range-selector.scss').toString() ],
})
export class DateRangeSelectorComponent {

    public weeks: Day[][] = [];
    public weekDayNames: string[];
    public monthTitle: string;

    @Input()
    public maxNumberOfDays: number = 30;
    @Input()
    public allowAll: boolean = false;
    @Input()
    set isUpdateNeeded(value: boolean) {
        // GUI-1902 - update all ranges
        if (value) {
            this.allRanges = this.getAllRanges();
            this.rangesWithoutAll = this.getRangesWithoutAll();
        }
    }

    public dateRange: DateRange;

    private offDragHandlers: () => void = null;
    private dragMode: string = null;
    private selectedMonth: moment.Moment = null;
    private allRanges = this.getAllRanges();
    private rangesWithoutAll = this.getRangesWithoutAll();

    constructor(private el: ElementRef) {
        this.weekDayNames = WEEK.map(day => moment().startOf('week').add(day, 'days').format('ddd'));
    }

    public get ranges(): any[] {
        return this.allowAll ? this.allRanges : this.rangesWithoutAll;
    }

    public getAllRanges() {
        return [
            {title: 'today', numberOfDays: 1, endDate: moment().endOf('day')},
            {title: 'yesterday',  numberOfDays: 1, endDate: moment().add(-1, 'day').endOf('day')},
            {title: 'last 7 days', numberOfDays: 7, endDate: moment().endOf('day')},
            {title: 'last 15 days', numberOfDays: 15, endDate: moment().endOf('day')},
            {title: 'last 30 days', numberOfDays: 30, endDate: moment().endOf('day')},
            {title: 'all', numberOfDays: -1, endDate: moment().endOf('day'), all: true},
        ];
    }

    public getRangesWithoutAll() {
        return this.getAllRanges().slice(0, this.allRanges.length - 1);
    }

    public byTitle(item: any) {
        return item.title;
    }

    public changeRange(range: {numberOfDays: number, endDate: moment.Moment}) {
        let endDate = moment(range.endDate).endOf('day');
        if (this.dateRange.endDate.unix() !== endDate.unix()) {
            this.dateRange.endDate = endDate;
            this.selectedMonth = moment(this.dateRange.endDate);
        }
        this.dateRange.durationDays = range.numberOfDays;
        this.generateWeeks();
    }

    public selectCustomRange() {
        this.changeRange({ numberOfDays: 2, endDate: moment() });
    }

    public isCustomRangeSelected() {
        return !this.ranges.find(range => this.isRangeSelected(range));
    }

    public isRangeSelected(range: {numberOfDays: number, endDate: moment.Moment}) {
        let isSelected = this.dateRange.durationDays === range.numberOfDays;
        if (range.numberOfDays > -1) {
            isSelected = isSelected && this.dateRange.endDate.isSame(range.endDate);
        }
        return isSelected;
    }

    @Input()
    public set input(value: DateRange) {
        this.dateRange = new DateRange(value.durationDays, value.endDate);
        this.selectedMonth = moment(this.dateRange.endDate);
        this.generateWeeks();
    }

    public get input(): DateRange {
        return this.dateRange;
    }

    public changeIntervalEnd(intervalEnd: moment.Moment) {
        this.dateRange.endDate = intervalEnd.clone().endOf('day');
        if (this.dateRange.durationDays === -1) {
            this.dateRange.durationDays = 1;
        }
        this.generateWeeks();
    }

    public startDragging(dragMode) {
        this.dragMode = dragMode;
        let mouseMoveHandler = e => this.onDragOver(e);
        let mouseUpHandler = e => this.endDrag();
        $(this.el.nativeElement).on('mousemove', '.date-range-selector__cell', mouseMoveHandler);
        $(this.el.nativeElement).on('mouseup', '.date-range-selector__cell', mouseUpHandler);
        this.offDragHandlers = () => {
            $(this.el.nativeElement).off('mousemove', '.date-range-selector__cell', mouseMoveHandler);
            $(this.el.nativeElement).off('mouseup', '.date-range-selector__cell', mouseUpHandler);
        };
    }

    public onDragOver(e) {
        let date = moment.unix(parseInt($(e.currentTarget).attr('data-date'), 10));
        if (this.dragMode === 'start') {
            let daysDiff = this.dateRange.startDate.diff(date, 'day');
            if (daysDiff !== 0) {
                this.dateRange.durationDays = this.dateRange.durationDays + daysDiff;
                if (!this.allRanges) {
                    this.dateRange.durationDays = Math.min(this.maxNumberOfDays, this.dateRange.durationDays);
                }
                this.dateRange.durationDays = Math.max(this.dateRange.durationDays, 1);
                this.generateWeeks();
            }
        } else if (this.dragMode === 'end') {
            date = date.endOf('day');
            let daysDiff = date.diff(this.dateRange.endDate, 'day');
            if (daysDiff !== 0) {
                let newDuration = Math.max(Math.min(this.maxNumberOfDays, this.dateRange.durationDays + daysDiff), 1);
                let diff = newDuration - this.dateRange.durationDays;
                this.dateRange.durationDays = newDuration;
                this.dateRange.endDate.add(diff, 'days');
                this.generateWeeks();
            }
        }
    }

    public endDrag() {
        this.dragMode = null;
        if (this.offDragHandlers) {
            this.offDragHandlers();
            this.offDragHandlers = null;
        }
    }

    public changeSelectedMonth(count) {
        this.selectedMonth.add(count, 'months');
        this.generateWeeks();
    }

    public trackByFirstDayUnixTime(index, week: Day[]) {
        return week[0].date.unix;
    }

    public trackByDayUnixTime(index, day: Day) {
        return day.date.unix();
    }

    private generateWeeks() {
        let monthStart = moment(this.selectedMonth).startOf('month');
        let monthEnd = moment(this.selectedMonth).endOf('month');
        this.monthTitle = monthStart.format('MMMM');
        let weeksCount = (monthEnd.week() > monthStart.week() ? monthEnd.week() : monthEnd.weeksInYear() + 1) - monthStart.week() + 1;

        let firstDayWeekIndex = WEEK.indexOf(monthStart.weekday());
        let firstWeek = [];
        for (let i = 0; i < firstDayWeekIndex; i++) {
            let dayTime = moment(monthStart).subtract(firstDayWeekIndex - i, 'days');
            firstWeek.push({
                currentMonth: false,
                number: dayTime.date(),
                date: dayTime,
                selected: false,
                firstSelected: false,
                lastSelected: false,
            });
        }
        this.weeks = [firstWeek];
        let dayTime = moment(monthStart);
        for (let weekIndex = 0; weekIndex < weeksCount; weekIndex++) {
            let week = this.weeks[weekIndex];
            for (let dayIndex = firstDayWeekIndex; dayIndex < WEEK.length; dayIndex++) {
                week.push({
                    currentMonth: dayTime.month() === monthStart.month(),
                    number: dayTime.date(),
                    date: dayTime.clone(),
                    selected: false,
                    firstSelected: false,
                    lastSelected: false,
                });
                dayTime.add(1, 'day');
            }
            if (weekIndex < weeksCount - 1) {
                this.weeks.push([]);
            }
            firstDayWeekIndex = 0;
        }
        let intervalStart = this.dateRange.startDate;
        let days: Day[] = [].concat.apply([], this.weeks);
        days.forEach(day => {
            day.selected = day.date.isBetween(intervalStart, this.dateRange.endDate, 'day', '[]');
            day.firstSelected = day.selected && day.date.clone().startOf('day').isSame(intervalStart);
            day.lastSelected = day.selected && day.date.clone().endOf('day').isSame(this.dateRange.endDate);
        });
    }
}
