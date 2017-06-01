import {
    Component, AfterViewInit, ElementRef, Input, OnInit, Directive, HostListener, ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'ax-dropdown',
    templateUrl: './dropdown.html',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('./dropdown.scss').toString() ],
})
export class DropDownComponent implements AfterViewInit, OnInit {

    @Input()
    isMenu: boolean = false;

    @Input()
    customClass: string;

    public opened: boolean;
    public anchorHeight: number;
    public isTop: boolean = false;
    public isLeft: boolean = false;

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        this.isLeft = this.customClass === 'left';
    }

    public ngAfterViewInit() {
        this.anchorHeight = this.el.nativeElement.querySelector('.dropdown__anchor').offsetHeight + 4; // with margin
    }

    public open() {
        let offsetParent = this.el.nativeElement.offsetParent;
        let top = this.el.nativeElement.offsetTop;
        let scrollWindowTop = window.pageYOffset || document.documentElement.scrollTop;

        for (; offsetParent !== null; offsetParent = offsetParent.offsetParent) {
            top += offsetParent.offsetTop;
        }

        this.isTop = this.el.nativeElement.querySelector('.dropdown__content').offsetHeight + top + this.anchorHeight - scrollWindowTop > window.innerHeight;
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
