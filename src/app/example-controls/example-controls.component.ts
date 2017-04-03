import { Component } from '@angular/core';

import { DateRange, NotificationsService  } from '../../components';

@Component({
    selector: 'ax-example-controls',
    templateUrl: './example-controls.html',
})
export class ExampleControlsComponent {

    public dateRangeInput = DateRange.today();

    constructor(public notificationsService: NotificationsService) {
    }
}
