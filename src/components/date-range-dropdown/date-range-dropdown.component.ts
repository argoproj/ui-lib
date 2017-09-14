import { Component, Input, Output, EventEmitter, ViewChild, AfterContentInit } from '@angular/core';
import { DateRangeSelectorComponent, DateRange } from '../date-range-selector';
import { DropDownComponent } from '../dropdown/dropdown.component';

import * as moment from 'moment';

@Component({
    selector: 'ax-date-range-dropdown',
    templateUrl: './date-range-dropdown.html',
    styles: [ require('./_date-range-dropdown.scss').toString() ],
})
export class DateRangeDropDownComponent implements AfterContentInit {

    public hasContent: boolean;
    private allRanges = this.getAllRanges();
    private rangesWithoutAll = this.getRangesWithoutAll();

    @Input()
    public range: DateRange;
    @Output()
    public rangeChanged: EventEmitter<DateRange> = new EventEmitter<DateRange>();
    @ViewChild(DropDownComponent)
    public dropDown: DropDownComponent;
    @ViewChild(DateRangeSelectorComponent)
    public dateRangeSelector: DateRangeSelectorComponent;
    @ViewChild('content')
    private content;
    @Input()
    public allowAll: boolean = false;

    public showCustomRange: boolean = false;

    public ngAfterContentInit() {
        this.hasContent = this.content.nativeElement.children.length > 0;
    }

    public applyDateRangeSelection() {
        this.rangeChanged.emit(this.dateRangeSelector.input);
        this.dropDown.close();
    }

    public cancelDateRangeSelection() {
        this.dropDown.close();
        setTimeout(() => {
            this.showCustomRange = false;
        }, 500);
    }

    public get ranges(): any[] {
        return this.allowAll ? this.allRanges : this.rangesWithoutAll;
    }

    public getAllRanges() {
        return [
            {title: 'Today', numberOfDays: 1, endDate: moment().endOf('day')},
            {title: 'Yesterday',  numberOfDays: 1, endDate: moment().add(-1, 'day').endOf('day')},
            {title: 'Last 7 days', numberOfDays: 7, endDate: moment().endOf('day')},
            {title: 'Last 15 days', numberOfDays: 15, endDate: moment().endOf('day')},
            {title: 'Last 30 days', numberOfDays: 30, endDate: moment().endOf('day')},
            {title: 'All', numberOfDays: -1, endDate: moment().endOf('day'), all: true},
        ];
    }

    public getRangesWithoutAll() {
        return this.getAllRanges().slice(0, this.allRanges.length - 1);
    }

    public isCustomRangeSelected() {
        return this.dateRangeSelector && !this.ranges.find(range => this.isRangeSelected(range));
    }

    public onOpen() {
        this.allRanges = this.getAllRanges();
        this.rangesWithoutAll = this.getRangesWithoutAll();
    }

    public isRangeSelected(range: {numberOfDays: number, endDate: moment.Moment}) {
        let isSelected = this.dateRangeSelector.dateRange && this.dateRangeSelector.dateRange.durationDays === range.numberOfDays;
        if (range.numberOfDays > -1) {
            isSelected = isSelected && this.dateRangeSelector.dateRange.endDate.isSame(range.endDate);
        }
        return isSelected;
    }

    public selectCustomRange() {
        this.dropDown.close();
        setTimeout(() => {
            this.showCustomRange = true;
            setTimeout(() => this.dropDown.open());
        }, 500);
    }

    public changeRange(range: { numberOfDays: number, endDate: moment.Moment }) {
        let endDate = moment(range.endDate).endOf('day');
        if (this.dateRangeSelector.dateRange.endDate.unix() !== endDate.unix()) {
            this.dateRangeSelector.dateRange.endDate = endDate;
        }
        this.dateRangeSelector.dateRange.durationDays = range.numberOfDays;

        this.rangeChanged.emit(this.dateRangeSelector.dateRange);
        this.dropDown.close();
    }
}
