import { Directive } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[ax-control-has-value][ngModel]',
    providers: [ NgModel ],
    host: {
        '[class.ax-has-value]': 'hasValue',
    }
})
export class ControlHasValueDirective {

    constructor(private model: NgModel) {
    }

    get hasValue() {
        return this.model.value !== '';
    }
}
