import { Component } from '@angular/core';

import { DateRange  } from '../../components';

@Component({
    selector: 'ax-example-controls',
    templateUrl: './example-controls.html',
})
export class ExampleControlsComponent {
    public dateRangeInput = DateRange.today();
}
