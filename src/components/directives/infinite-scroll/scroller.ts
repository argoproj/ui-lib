import { ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

export class Scroller {
    public scrollDownDistance: number;
    public scrollUpDistance: number;
    public scrollEnabled: boolean;
    public checkWhenEnabled: boolean;
    public container: Window | ElementRef | any;
    public immediateCheck: boolean;
    public useDocumentBottom: boolean;
    public checkInterval: number;
    public lastScrollPosition: number = 0;
    private documentElement: Window | ElementRef | any;
    private isContainerWindow: boolean;
    private disposeScroll: Subscription;

    constructor(
        private windowElement: Window | ElementRef | any,
        private $interval: (callback, timeline) => any,
        private $elementRef: ElementRef,
        private infiniteScrollDownCallback: () => any,
        private infiniteScrollUpCallback: () => any,
        infiniteScrollDownDistance: number,
        infiniteScrollUpDistance: number,
        infiniteScrollParent: Window | ElementRef | any,
        private infiniteScrollThrottle: number,
        private isImmediate: boolean,
    ) {
        this.isContainerWindow = this.windowElement.toString().includes('Window');
        this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
        this.handleInfiniteScrollDistance(infiniteScrollDownDistance, infiniteScrollUpDistance);

        this.handleInfiniteScrollDisabled(false);
        this.defineContainer();
        this.createInterval();
    }

    public defineContainer() {
        if (this.isContainerWindow) {
            this.attachEvent(this.windowElement);
        } else {
            this.container = this.windowElement.nativeElement;
        }
    }

    public createInterval() {
        this.checkInterval = this.$interval(() => {
            if (this.isImmediate) {
                return this.handler();
            }
        }, 0);
    }

    public height(elem: any) {
        // elem = elem.nativeElement;
        if (isNaN(elem.offsetHeight)) {
            return this.documentElement.clientHeight;
        } else {
            return elem.offsetHeight;
        }
    }

    public offsetTop(elem: any) {
        // elem = elem.nativeElement;
        if (!elem.getBoundingClientRect) { // || elem.css('none')) {
            return;
        }
        return elem.getBoundingClientRect().top + this.pageYOffset(elem);
    }

    public pageYOffset(elem: any) {
        // elem = elem.nativeElement;
        if (isNaN(window.pageYOffset)) {
            return this.documentElement.scrollTop;
        } else if (elem.ownerDocument) {
            return elem.ownerDocument.defaultView.pageYOffset;
        } else {
            return <any> elem.offsetTop;
        }
    }

    public handler() {
        const container = this.calculatePoints();
        const scrollingDown: boolean = this.lastScrollPosition < container.scrolledUntilNow;
        this.lastScrollPosition = container.scrolledUntilNow;

        let remaining: number;
        let containerBreakpoint: number;
        if (scrollingDown) {
            remaining = container.totalToScroll - container.scrolledUntilNow;
            containerBreakpoint = container.height * this.scrollDownDistance + 1;
        } else {
            remaining = container.scrolledUntilNow;
            containerBreakpoint = container.height * this.scrollUpDistance + 1;
        }
        const shouldScroll: boolean = remaining <= containerBreakpoint;
        const triggerCallback: boolean = shouldScroll && this.scrollEnabled;
        const shouldClearInterval = shouldScroll && this.checkInterval;

        this.checkWhenEnabled = shouldScroll;

        if (triggerCallback) {
            if (scrollingDown) {
                this.infiniteScrollDownCallback();
            } else {
                this.infiniteScrollUpCallback();
            }
        }
        if (shouldClearInterval) {
            clearInterval(this.checkInterval);
        }
    }

    public calculatePoints() {
        return this.isContainerWindow
            ? this.calculatePointsForWindow()
            : this.calculatePointsForElement();
    }

    public calculatePointsForWindow() {
        // container's height
        const height = this.height(this.container);
        // scrolled until now / current y point
        const scrolledUntilNow = height + this.pageYOffset(this.documentElement);
        // total height / most bottom y point
        const totalToScroll = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
        return { height, scrolledUntilNow, totalToScroll };
    }

    public calculatePointsForElement() {
        const height = this.height(this.container);
        // perhaps use this.container.offsetTop instead of 'scrollTop'
        const scrolledUntilNow = this.container.scrollTop;
        let containerTopOffset = 0;
        const offsetTop = this.offsetTop(this.container);
        if (offsetTop !== void 0) {
            containerTopOffset = offsetTop;
        }
        const totalToScroll = this.container.scrollHeight;
        // const totalToScroll = this.offsetTop(this.$elementRef.nativeElement)
        // - containerTopOffset + this.height(this.$elementRef.nativeElement);
        return { height, scrolledUntilNow, totalToScroll };
    }

    public handleInfiniteScrollDistance(scrollDownDistance: number | any, scrollUpDistance: number | any) {
        this.scrollDownDistance = parseFloat(scrollDownDistance) || 0;
        this.scrollUpDistance = parseFloat(scrollUpDistance) || 0;
    }

    public attachEvent(newContainer: Window | ElementRef | any) {
        this.clean();
        this.container = newContainer;
        if (newContainer) {
            const throttle: number = this.infiniteScrollThrottle;
            this.disposeScroll = Observable.fromEvent(this.container, 'scroll')
                .debounce(ev => Observable.timer(throttle))
                .subscribe(ev => this.handler());
        }
    }

    public clean() {
        if (this.disposeScroll) {
            this.disposeScroll.unsubscribe();
        }
    }

   public handleInfiniteScrollDisabled(enableScroll: boolean) {
        this.scrollEnabled = !enableScroll;
    }
}
