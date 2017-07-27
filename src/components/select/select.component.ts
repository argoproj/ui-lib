import { Component, ElementRef, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable */
    useExisting: forwardRef(() => SelectComponent),
    /* tslint:enable */
    multi: true,
};

export class SelectOption {
    public value: string;
    public name: string;
}

@Component({
    selector: 'ax-select',
    templateUrl: './select.html',
    styles: [ require('./select.scss').toString() ],
    providers: [
        CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    ],
})
export class SelectComponent implements ControlValueAccessor {

    public openedDropdown: boolean;
    public toTop: boolean;
    public innerOptions: SelectOption[] = [];
    public search: string;
    private innerValue: string;
    public onChange: any = () => {
        // do nothing
    }
    public onTouched: any = () => {
        // do nothing
    }

    @Input()
    public set options(options: SelectOption[] | string[]) {
        this.innerOptions = [];
        if (options.length > 0 && typeof options[0] === 'string') {
            for (let option of options) {
                this.innerOptions.push({ value: <string> option, name: <string> option });
            }
        } else {
            this.innerOptions = <SelectOption[]> options;
        }
    }

    @Input()
    public placeholder: string = 'Select option';

    @ViewChild('searchEl')
    public searchEl: ElementRef;

    constructor(private el: ElementRef) {
    }

    public get nameOfValue(): string {
        return this.optionExists(this.value) && this.innerOptions.filter(option => option.value === this.value)[ 0 ].name;
    }

    public get value() {
        return this.optionExists(this.innerValue) && this.innerValue;
    }

    public set value(value) {
        if (this.optionExists(value)) {
            this.innerValue = value;
            this.onChange(value);
        }
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

        setTimeout(() => this.searchEl.nativeElement.focus(), 1000);
    }

    public select(value) {
        this.value = value;
        this.onTouched();
        this.openedDropdown = false;
        this.search = null;
    }

    public writeValue(value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
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
            this.search = null;
        }
    }

    private optionExists(value) {
        return this.innerOptions.filter(option => option.value === value).length === 1;
    }
}
