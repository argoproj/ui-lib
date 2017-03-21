import {Component, EventEmitter, Input, Output} from '@angular/core';

let nextId = 0;

@Component({
    selector: 'ax-radiobox',
    template:
    `<div class="ax-radio">
        <input type="radio" [disabled]="disabled" [attr.id]="id" [checked]="checked" (change)="handleOnChange($event)">
        <span></span>
    </div>
    <label [attr.for]="id">{{label}}</label>`
})
export class RadioboxComponent {
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
        this.id = `_rbx_${nextId++}`;
    }

    handleOnChange(e: any) {
        if (!this.disabled) {
            this.onChange.emit(e);
        }
    }
}
