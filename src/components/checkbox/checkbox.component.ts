import {Component, EventEmitter, Input, Output} from '@angular/core';

let nextId = 0;

@Component({
    selector: 'ax-checkbox',
    template:
    `<div class="ax-checkbox">
        <input type="checkbox" [disabled]="disabled" [checked]="checked" (change)="handleOnChange($event)" [attr.id]="id">
        <span><i class="fa fa-check"></i></span>
    </div>
    <label [attr.for]="id">{{label}}</label>`
})
export class CheckboxComponent {
    id: string;

    @Input()
    label: string;

    @Input()
    checked: boolean;

    @Input()
    disabled: boolean;

    @Output()
    onChange: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.id = `_cbx_${nextId++}`;
    }

    handleOnChange(e: any) {
        if (!this.disabled) {
            this.onChange.emit(e);
        }
    }
}
