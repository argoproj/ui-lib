import { Subscription } from 'rxjs';
import { Component, ElementRef, Input, Directive, HostListener, ViewEncapsulation, EventEmitter, OnInit, OnDestroy } from '@angular/core';

const dropDownOpened = new EventEmitter<DropDownComponent>();

@Component({
    selector: 'ax-dropdown',
    templateUrl: './dropdown.html',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./dropdown.scss').toString() ],
})
export class DropDownComponent implements OnInit, OnDestroy {

    @Input()
    public isMenu: boolean = false;

    @Input()
    public customClass: string;

    public opened: boolean;
    public left: number = 0;
    public top: number = 0;

    private subscriptions: Subscription[] = [];

    constructor(private el: ElementRef) {
    }

    public open() {
        let scrollWindowTop = 0;
        let scrollWindowLeft = 0;
        let offsetParent = this.el.nativeElement.offsetParent;
        let top = this.el.nativeElement.offsetTop;
        let left = this.el.nativeElement.offsetLeft;
        let anchor = this.el.nativeElement.querySelector('.ax-dropdown__anchor');
        let content = this.el.nativeElement.querySelector('.ax-dropdown__content');
        let anchorHeight = anchor.offsetHeight + 2;

        for (; offsetParent !== null; offsetParent = offsetParent.offsetParent) {
            scrollWindowTop += offsetParent.scrollTop;
            scrollWindowLeft += offsetParent.scrollLeft;
            top += offsetParent.offsetTop;
            left += offsetParent.offsetLeft;
        }

        // Set top position
        if (content.offsetHeight + top + anchorHeight - scrollWindowTop > window.innerHeight) {
            this.top = anchor.offsetTop - content.offsetHeight - 2;
        } else {
            this.top = anchor.offsetTop + anchorHeight;
        }

        // Set left position
        if (content.offsetWidth + left - scrollWindowLeft > window.innerWidth || this.customClass === 'left') {
            this.left = anchor.offsetLeft - content.offsetWidth + anchor.offsetWidth;
        } else {
            this.left = anchor.offsetLeft;
        }

        this.opened = true;
        dropDownOpened.emit(this);
    }

    public close() {
        this.opened = false;
    }

    public ngOnInit() {
        dropDownOpened.subscribe(dropdown => {
            if (this !== dropdown) {
                this.close();
            }
        });
    }

    public ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }

    @HostListener('document:click', [ '$event' ])
    public onClick(event) {
        if (!this.el.nativeElement.contains(event.target) && this.opened) {
            this.opened = false;
        }
    }
}

@Directive({ selector: 'ax-dropdown-anchor' })
export class DropdownAnchorDirective {
}

@Directive({ selector: 'ax-dropdown-content' })
export class DropdownContentDirective {
}
