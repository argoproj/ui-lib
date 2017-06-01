import { Component, ElementRef, Input, Directive, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ax-dropdown',
    templateUrl: './dropdown.html',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./dropdown.scss').toString() ],
})
export class DropDownComponent {

    @Input()
    isMenu: boolean = false;

    @Input()
    customClass: string;

    public opened: boolean;
    public left: number = 0;
    public top: number = 0;

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
    }

    public close() {
        this.opened = false;
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
