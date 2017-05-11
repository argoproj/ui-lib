import { Component } from '@angular/core';

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

    constructor(public notificationsService: NotificationsService) {
    }
}
