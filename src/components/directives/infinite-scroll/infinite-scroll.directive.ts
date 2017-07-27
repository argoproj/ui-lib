import { Directive, ElementRef, Input, Output, HostListener, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Scroller } from './scroller';

@Directive({
    selector: '[ax-infinite-scroll]',
})
export class InfiniteScrollDirective implements OnDestroy, OnInit {
    public scroller: Scroller;

    @Input('ax-infinite-scroll-distance')
    public distanceDown: number = 2;
    @Input('ax-infinite-scroll-up-distance')
    public distanceUp: number = 1.5;
    @Input('ax-infinite-scrollthrottle')
    public throttle: number = 3;
    @Input('ax-scroll-window')
    public scrollWindow: boolean = true;
    @Input('ax-immediate-check')
    public immediate: boolean = false;

    @Input('ax-scroll-items')
    set scrollItems(data: any) {
        setTimeout(() => {
            let container = $(this.scroller.container);
            if (container.get(0).scrollHeight <= container.height()) {
                this.onScrollDown();
            }
        });
    }

    @Output()
    public scrolled = new EventEmitter();
    @Output()
    public scrolledUp = new EventEmitter();

    constructor(private element: ElementRef) {}

    public ngOnInit() {
        const containerElement = this.scrollWindow ? window : this.element;
        this.scroller = new Scroller(containerElement, setInterval, this.element,
            this.onScrollDown.bind(this), this.onScrollUp.bind(this),
            this.distanceDown, this.distanceUp, {}, this.throttle, this.immediate);
    }

    public ngOnDestroy() {
        this.scroller.clean();
    }

    public onScrollDown() {
        this.scrolled.next({});
    }

    public onScrollUp() {
        this.scrolledUp.next({});
    }

    @HostListener('scroll', ['$event'])
    public handleScroll(event: any) {
        this.scroller.handler();
    }
}
