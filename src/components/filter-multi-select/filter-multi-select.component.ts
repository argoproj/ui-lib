import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';

export interface FilterMultiSelectCheckbox {
    name: string;
    value: string;
    checked?: boolean;
    subname?: string;
}

export interface FilterMultiSelectMessages {
    name: string;
    emptyInput?: string;
    notEmptyInput?: string;
}

export class FilterMultiSelect {
    public items?: FilterMultiSelectCheckbox[];
    public messages?: FilterMultiSelectMessages;
    public isVisible?: boolean;
    public isStaticList?: boolean;
    public isDisplayedInline?: boolean;
    public selectedItems?: string[];

    constructor(
        items: FilterMultiSelectCheckbox[],
        messages: FilterMultiSelectMessages,
        selectedItems?: string[],
        isVisible?: boolean,
        isStaticList?: boolean,
        isDisplayedInline?: boolean) {
        this.items = items || [];
        this.messages = messages;
        this.selectedItems = selectedItems || [];
        this.isVisible = isVisible || false;
        this.isStaticList = isStaticList || false;
        this.isDisplayedInline = isDisplayedInline || false;
    }
}

@Component({
    selector: 'ax-filter-multi-select',
    templateUrl: './filter-multi-select.html',
    styles: [ require('./filter-multi-select.scss').toString() ],
})
export class FilterMultiSelectComponent implements OnInit {
    @ViewChild('inputElement')
    public inputElement: ElementRef;

    @Input()
    public debounce: number = 300;

    @Input()
    public texts: FilterMultiSelectMessages;

    @Input()
    public limit: number = 5;

    @Input()
    public isDisabled: boolean = false;

    @Input()
    public isStaticList: boolean = false;

    @Input()
    public isDisplayedInline: boolean = false;

    @Input()
    public isConfirmationRequired: boolean = true;

    @Input()
    public selectedItems: string[] = [];

    @Input()
    public width: string = 'auto';

    @Input()
    public brightStyle: boolean = false;

    @Input()
    set items(items: FilterMultiSelectCheckbox[]) {
        this.showLoader = false;
        this.showEmptyListMsg = this.isStaticList && this.displayedItems.length === 0;

        this.displayedItems = items.map(item => {
            item.checked = item.checked || this.selectedItems.indexOf(item.value) !== -1;
            return item;
        });
    };

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter();

    @Output()
    public onQuery: EventEmitter<any> = new EventEmitter();

    public showLoader: boolean = false;
    public showEmptyListMsg: boolean = false;
    public isActive: boolean = false;
    public searchControlString: string;
    public displayedItems: FilterMultiSelectCheckbox[] = [];
    public serchSubject: Subject<string> = new Subject<string>();

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        this.serchSubject
            .debounceTime(this.debounce)
            // .distinctUntilChanged() // only emit if value is different from previous value
            .subscribe(model => {
                this.searchControlString = model;
                if (model.length) { // run search only if input is not empty
                    this.showLoader = true;
                    this.showEmptyListMsg = true;
                    this.onQuery.emit(model);
                } else { // remove result from list if input is empty
                    this.displayedItems = [];
                }
            });
    }

    public searchStringChanged(searchString: string) {
        this.showEmptyListMsg = false;
        this.serchSubject.next(searchString);
    }

    public onApply(newItemsList?: string[]) {
        if (!newItemsList) {
            // remove unchecked items on the list
            this.displayedItems.forEach(item => {
                if (this.selectedItems.indexOf(item.value) !== -1) {
                    this.selectedItems.splice(this.selectedItems.indexOf(item.value), 1);
                }
            });

            this.selectedItems = this.selectedItems.concat(this.displayedItems.filter(opt => opt.checked).map(opt => opt.value));
        } else {
            this.displayedItems = this.displayedItems.map(item => {
                item.checked = this.selectedItems.indexOf(item.value) !== -1;
                return item;
            });

            this.selectedItems = newItemsList;
        }

        this.searchControlString = '';
        this.displayedItems = this.isStaticList ? this.displayedItems : [];
        this.isActive = false;
        this.onChange.emit(this.selectedItems);
    }

    public onItemChange() {
        if (!this.isConfirmationRequired) {
            this.selectedItems = this.displayedItems.filter(opt => opt.checked).map(opt => opt.value);
            this.onChange.emit(this.selectedItems);
        }
    }

    public removeItemFromSelection(item: string) {
        this.selectedItems = this.selectedItems.filter(i => i !== item);

        this.onApply(this.selectedItems);
    }

    public onToggleDropdown() {
        if (this.isDisabled) {
            return;
        }

        // get items for static list
        if (this.isStaticList) {
            this.showLoader = this.displayedItems.length === 0;
            this.onQuery.emit();
        }

        this.isActive = !this.isActive;
        // focus on input
        if (this.isActive && !this.isStaticList) {
            setTimeout(() => {
                this.inputElement.nativeElement.focus();
            });
        }
    }

    @HostListener('document:click', ['$event'])
    public onClick(event) {
        if (!this.el.nativeElement.contains(event.target)) {
            this.isActive = false;
        }
    }
}
