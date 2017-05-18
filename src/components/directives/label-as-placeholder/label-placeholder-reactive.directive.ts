import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[ax-label-placeholder][formControlName]',
    host: {
        '[class.ax-has-value]': 'hasValue',
        '[class.ax-focus-out]': 'checkFocusOut',
        '(focusin)': 'focusIn()',
        '(focusout)': 'focusOut()',
    }
})
export class LabelPlaceholderReactiveDirective {

    private isFocusOut: boolean;

    constructor(private control: NgControl) {
    }

    get hasValue() {
        return !!this.control.value;
    }

    get checkFocusOut() {
        return this.isFocusOut;
    }

    public focusIn() {
        this.isFocusOut = true;
    }

    public focusOut() {
        setTimeout(() => this.isFocusOut = false, 200);
    }
}
