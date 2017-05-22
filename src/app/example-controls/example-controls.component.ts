import { Component } from '@angular/core';

import { DateRange, NotificationsService, DropdownMenuSettings } from '../../components';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

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
    }]);
    public swipeCheckboxFirst: boolean = false;
    public swipeCheckboxSecond: boolean = true;
    public inputTest: string = 'first';
    public selectOptions = ['first', 'second'];
    public form: FormGroup;

    constructor(public notificationsService: NotificationsService) {
        this.form = new FormGroup({
            single: new FormControl(''),
            multiple: new FormControl([]),
        });
    }
}
