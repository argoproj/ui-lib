import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[ax-control-has-value][formControlName]',
    host: {
        '[class.ax-has-value]': 'hasValue',
    }
})
export class ControlHasValueReactiveDirective {

    constructor(private control: NgControl) {
    }

    get hasValue() {
        return this.control.value !== '';
    }
}
