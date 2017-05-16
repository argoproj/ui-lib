import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SwipeCheckboxLabels } from './swipe-checkbox.interface';

export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwipeCheckboxComponent),
    multi: true,
};

/**
 *
 * How to use
 * <h3>NgModel</h3>
 * <ax-swipe-checkbox [(ngModel)]="value" [title]="'My Switch'"></ax-swipe-checkbox><br />
 * <strong>Value:</strong> {{value}}
 *
 * <h3>Reactive Forms</h3>
 * <form [formGroup]="myForm" (ngSubmit)="submit()">
 * <ax-swipe-checkbox formControlName="mySwitch" [title]="'My Switch'"></ax-swipe-checkbox>
 * <button>Submit</button>
 * </form>
 */

@Component({
    selector: 'ax-swipe-checkbox',
    templateUrl: './swipe-checkbox.html',
    styles: [ require('./_swipe-checkbox.scss').toString() ],
    providers: [
        CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    ],
})

export class SwipeCheckboxComponent implements ControlValueAccessor {
    @Input()
    public title = 'swipe';
    @Input()
    public labels: SwipeCheckboxLabels = {enable: 'enable', disable: 'disable'};
    @Input()
    public width: number = 104;
    @Input()
    private _value = false;
    public onChange: any = () => {};
    public onTouched: any = () => {};

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    public swipe() {
        this.value = !this.value;
    }

    public writeValue(value) {
        if (value) {
            this.value = value;
        }
    }

    public registerOnChange(fn) {
        this.onChange = fn;
    }

    public registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
