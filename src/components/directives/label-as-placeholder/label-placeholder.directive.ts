import { Directive } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[ax-label-placeholder][ngModel]',
    providers: [ NgModel ],
    /* tslint:disable */
    host: {
        '[class.ax-has-value]': 'hasValue',
        '[class.ax-focus-out]': 'checkFocusOut',
        '(focusin)': 'focusIn()',
        '(focusout)': 'focusOut()',
    }
    /* tslint:enable */
})
export class LabelPlaceholderDirective {

    private isFocusOut: boolean;

    constructor(private model: NgModel) {
    }

    get hasValue() {
        return !!this.model.value;
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
