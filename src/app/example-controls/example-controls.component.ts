import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DateRange, NotificationsService, DropdownMenuSettings } from '../../components';

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
    public inputTest: string = 'Test';
    private form: FormGroup;

    constructor(public notificationsService: NotificationsService) {
        this.form = new FormGroup({
            test: new FormControl('Test'),
        });
    }
}
