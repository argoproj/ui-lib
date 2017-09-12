import { Component } from '@angular/core';

import { DateRange, NotificationsService, DropdownMenuSettings, FilterMultiSelect } from '../../components';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'ax-example-controls',
    templateUrl: './example-controls.html',
})
export class ExampleControlsComponent {

    public dateRangeInput = DateRange.today();
    public menuSettings = new DropdownMenuSettings([{
        title: 'test',
        iconName: 'fa-times-circle-o',
        action: () => alert('Hello'),
    }, {
        title: 'test2',
        iconName: 'fa-times-circle-o',
        action: () => alert('Hello'),
    }]);
    public swipeCheckboxFirst: boolean = false;
    public swipeCheckboxSecond: boolean = true;
    public inputTest: string = 'first';
    public selectOptions = ['first', 'second'];
    public form: FormGroup;
    public filterMultiSelect: FilterMultiSelect = {
        items: [
            {name: 'Item 1', value: 'item_one'},
            {name: 'Item 2', value: 'item_two'},
            {name: 'Item 3', value: 'item_three'},
            {name: 'Item 4', value: 'item_four'},
        ],
        messages: { name: 'Example multi select' },
        isVisible: true,
        isStaticList: true,
        isDisplayedInline: true,
    };
    public filterMultiSelectOne: string[] = ['item_one'];

    constructor(public notificationsService: NotificationsService) {
        this.form = new FormGroup({
            single: new FormControl(''),
            multiple: new FormControl([]),
        });
    }

    public onEventTypeChange(e) {
        this.filterMultiSelectOne = e;
    }

    public onApplyDate(value: DateRange) {
        this.dateRangeInput = value;
    }
}
