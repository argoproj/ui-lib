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

class Month {
    public data: Day[][];
    public title: string;

    constructor() {
        this.data = [];
    }
}

@Component({
    selector: 'ax-date-range-selector',
    templateUrl: './date-range-selector.html',
    styles: [ require('./_date-range-selector.scss').toString() ],
})
export class DateRangeSelectorComponent {

    public firstMonth: Month = new Month();
    public secondMonth: Month = new Month();
    public weekDayNames: string[];
    public target: 'start' | 'end' = 'start';
    public dateRange: DateRange;
    private selectedMonth: moment.Moment = null;

    @Input()
    public maxNumberOfDays: number = 30;

    constructor(private el: ElementRef) {
        this.weekDayNames = WEEK.map(day => moment().startOf('week').add(day, 'days').format('ddd'));
    }

    public byTitle(item: any) {
        return item.title;
    }

    @Input()
    public set input(value: DateRange) {
        this.dateRange = new DateRange(value.durationDays, value.endDate);
        this.selectedMonth = moment(this.dateRange.endDate);
        this.generateMonths();
    }

    public get input(): DateRange {
        return this.dateRange;
    }

    public selectTarget(target: 'start' | 'end') {
        this.target = target;
    }

    public selectDate(day: Day) {
        if (!day.currentMonth) {
            return;
        }

        let daysDiff = this.dateRange.startDate.diff(day.date, 'day');

        if (this.target === 'start' || daysDiff > 0) {
            this.dateRange.durationDays = 1;
            this.dateRange.endDate = day.date.clone().endOf('day');
            this.selectTarget('end');
        } else {
            this.dateRange.durationDays = Math.min(this.maxNumberOfDays, Math.abs(daysDiff) + 1);
            this.dateRange.endDate = day.date.clone().endOf('day');
        }

        this.generateMonths();
    }

    public changeSelectedMonth(count) {
        this.selectedMonth.add(count, 'months');
        this.generateMonths();
    }

    public trackByFirstDayUnixTime(index, week: Day[]) {
        return week[0].date.unix;
    }

    public trackByDayUnixTime(index, day: Day) {
        return day.date.unix();
    }

    private generateMonths() {
        let firstSelectedMonth = this.selectedMonth.clone().add(-1, 'months');
        this.firstMonth = this.generateWeeks(firstSelectedMonth);
        this.secondMonth = this.generateWeeks(this.selectedMonth);
    }

    private generateWeeks(selectedMonth: moment.Moment): Month {
        let monthStart = moment(selectedMonth).startOf('month');
        let monthEnd = moment(selectedMonth).endOf('month');
        let weeksCount = (monthEnd.week() > monthStart.week() ? monthEnd.week() : monthEnd.weeksInYear() + 1) - monthStart.week() + 1;
        let weeks: Day[][] = [];

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
        weeks = [firstWeek];
        let dayTime = moment(monthStart);
        for (let weekIndex = 0; weekIndex < weeksCount; weekIndex++) {
            let week = weeks[weekIndex];
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
                weeks.push([]);
            }
            firstDayWeekIndex = 0;
        }
        let intervalStart = this.dateRange.startDate;
        let days: Day[] = [].concat.apply([], weeks);
        days.forEach(day => {
            day.selected = day.date.isBetween(intervalStart, this.dateRange.endDate, 'day', '[]');
            day.firstSelected = day.selected && day.date.clone().startOf('day').isSame(intervalStart);
            day.lastSelected = day.selected && day.date.clone().endOf('day').isSame(this.dateRange.endDate);
        });

        return {
            data: weeks,
            title: monthStart.format('MMMM'),
        };
    }
}
