import {Component, EventEmitter, Input, Output} from '@angular/core';

let nextId = 0;

@Component({
    selector: 'ax-radiobox',
    template:
    `<div class="ax-radio">
        <input type="radio" [disabled]="disabled" [attr.id]="id" [checked]="checked" (change)="handleOnChange($event)">
        <span></span>
    </div>
    <label [attr.for]="id">{{label}}</label>`,
})
export class RadioboxComponent {
    public id: string;

    @Input()
    public label: string;

    @Input()
    public checked: boolean;

    @Input()
    public disabled: boolean;

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.id = `_rbx_${nextId++}`;
    }

    public handleOnChange(e: any) {
        if (!this.disabled) {
            this.onChange.emit(e);
        }
    }
}
