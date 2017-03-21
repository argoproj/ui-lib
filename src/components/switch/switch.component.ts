import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ax-switch',
    templateUrl: './switch.html',
    styles: [ require('./switch.scss').toString() ],
})
export class SwitchComponent {

    @Input()
    public options = [];
    @Output()
    public onOptionChanged: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    public selectedValue: string = 'commit';

    protected selectOption(value: string) {
        let changed = value !== this.selectedValue;
        this.selectedValue = value;
        if (changed) {
            this.onOptionChanged.emit(value);
        }
    }
}
