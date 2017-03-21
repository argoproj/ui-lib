import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {DateRangeSelectorComponent, DateRange} from '../date-range-selector/index';
import {DropDownComponent} from '../dropdown/dropdown.component';

@Component({
    selector: 'ax-date-range-dropdown',
    templateUrl: './date-range-dropdown.html',
    styles: [ require('./_date-range-dropdown.scss').toString() ]
})
export class DateRangeDropDownComponent {

    @Input()
    public range: DateRange;
    @Output()
    public rangeChanged: EventEmitter<DateRange> = new EventEmitter<DateRange>();
    @ViewChild(DropDownComponent)
    public dropDown: DropDownComponent;
    @ViewChild(DateRangeSelectorComponent)
    public dateRangeSelector: DateRangeSelectorComponent;

    public applyDateRangeSelection() {
        this.rangeChanged.emit(this.dateRangeSelector.input);
        this.dropDown.close();
    }

    public cancelDateRangeSelection() {
        this.dropDown.close();
    }
}
