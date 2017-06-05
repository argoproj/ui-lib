import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true,
};

export class SelectOption {
    value: string;
    name: string;
}

@Component({
    selector: 'ax-multi-select',
    templateUrl: './multi-select.html',
    styles: [ require('./multi-select.scss').toString() ],
    providers: [
        CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    ],
})
export class MultiSelectComponent implements ControlValueAccessor {

    public onChange: any = () => {};
    public onTouched: any = () => {};
    public openedDropdown: boolean;
    public toTop: boolean;
    public innerOptions: SelectOption[] = [];
    private innerValue: string[] = [];

    @Input()
    set options(options: SelectOption[] | string[]) {
        this.innerOptions = [];
        if (options.length > 0 && typeof options[0] === 'string') {
            for (let key in options) {
                this.innerOptions.push({ value: <string>options[key], name: <string>options[key] });
            }
        } else {
            this.innerOptions = <SelectOption[]>options;
        }
    }

    @Input()
    public placeholder: string = 'Select options';

    @Input()
    public showTooltip: boolean;

    constructor(private el: ElementRef) {
    }

    get value() {
        return this.innerValue;
    }

    get nameOfValue(): string {
        return this.innerOptions.filter(o => this.value.indexOf(o.value) > -1).map(o => o.name).join(', ');
    }

    set value(value) {
        this.innerValue = value;
        this.onChange(value);
    }

    public openDropdown() {
        let offsetParent = this.el.nativeElement.offsetParent;
        let top = this.el.nativeElement.offsetTop;
        let scrollWindowTop = window.pageYOffset || document.documentElement.scrollTop;

        for (; offsetParent !== null; offsetParent = offsetParent.offsetParent) {
            top += offsetParent.offsetTop;
        }

        this.toTop = this.el.nativeElement.querySelector('.options').offsetHeight + top - scrollWindowTop > window.innerHeight;
        this.openedDropdown = true;
    }

    public select(value) {
        this.value.indexOf(value) > -1 ? this.value.splice(this.value.indexOf(value), 1) : this.value.push(value);
        this.onTouched();
    }

    public writeValue(value) {
        if (value !== undefined && value !== null) {
            this.innerValue = value;
        } else {
            this.innerValue = [];
        }
    }

    public registerOnChange(fn) {
        this.onChange = fn;
    }

    public registerOnTouched(fn) {
        this.onTouched = fn;
    }

    @HostListener('document:click', [ '$event' ])
    public onClick(event) {
        if (!this.el.nativeElement.contains(event.target) && this.openedDropdown) {
            this.openedDropdown = false;
        }
    }
}
