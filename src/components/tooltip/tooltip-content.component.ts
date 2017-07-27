import {Component, Input, AfterViewInit, ElementRef, ChangeDetectorRef, HostListener} from '@angular/core';

@Component({
    selector: 'ax-tooltip-content',
    template: `
<div class="tooltip {{ placement }}"
     [style.top]="top + 'px'"
     [style.left]="left + 'px'"
     [class.in]="isIn"
     [class.fade]="isFade"
     role="tooltip">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner">
        <ng-content></ng-content>
        {{ content }}
    </div>
</div>
`,
})
export class TooltipContentComponent implements AfterViewInit {

    @Input()
    public hostElement: HTMLElement;

    @Input()
    public content: string;

    @Input()
    public placement: 'top'|'bottom'|'left'|'right' = 'bottom';

    @Input()
    public animation: boolean = true;

    public top: number = -1000;
    public left: number = -1000;
    public isIn: boolean = false;
    public isFade: boolean = false;

    constructor(private element: ElementRef, private cdr: ChangeDetectorRef) {
    }

    public ngAfterViewInit(): void {
        this.show();
        this.cdr.detectChanges();
    }

    public show(): void {
        if (!this.hostElement) {
            return;
        }

        const p = this.positionElements(this.hostElement, this.element.nativeElement.children[0], this.placement);
        this.top = p.top;
        this.left = p.left;
        this.isIn = true;
        if (this.animation) {
            this.isFade = true;
        }
    }

    public hide(): void {
        this.top = -1000;
        this.left = -1000;
        this.isIn = true;
        if (this.animation) {
            this.isFade = false;
        }
    }

    @HostListener('mouseout', ['$event'])
    public hideTooltip(e?) {
        this.hide();
    }

    @HostListener('click', ['$event'])
    public onClick(e?) {
        e.stopPropagation();
    }

    private positionElements(hostEl: HTMLElement,
                             targetEl: HTMLElement,
                             positionStr: string,
                             appendToBody = false): { top: number, left: number } {
        let positionStrParts = positionStr.split('-');
        let pos0 = positionStrParts[0];
        let pos1 = positionStrParts[1] || 'center';
        let hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        let targetElWidth = targetEl.offsetWidth;
        let targetElHeight = targetEl.offsetHeight;
        let shiftWidth: any = {
            center(): number {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left(): number {
                return hostElPos.left;
            },
            right(): number {
                return hostElPos.left + hostElPos.width;
            },
        };

        let shiftHeight: any = {
            center(): number {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top(): number {
                return hostElPos.top;
            },
            bottom(): number {
                return hostElPos.top + hostElPos.height;
            },
        };

        let targetElPos: { top: number, left: number };
        switch (pos0) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0](),
                };
                break;

            case 'left':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth,
                };
                break;

            case 'bottom':
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1](),
                };
                break;

            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1](),
                };
                break;
        }

        return targetElPos;
    }

    private position(nativeEl: HTMLElement): { width: number, height: number, top: number, left: number } {
        let offsetParentBCR = { top: 0, left: 0 };
        const elBCR = this.offset(nativeEl);
        const offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left,
        };
    }

    private offset(nativeEl: any): { width: number, height: number, top: number, left: number } {
        const boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft),
        };
    }

    private getStyle(nativeEl: HTMLElement, cssProp: string): string {
        if ((nativeEl as any).currentStyle) {// IE
            return (nativeEl as any).currentStyle[cssProp];
        }

        if (window.getComputedStyle) {
            return (window.getComputedStyle(nativeEl) as any)[cssProp];
        }

        // finally try and get inline style
        return (nativeEl.style as any)[cssProp];
    }

    private isStaticPositioned(nativeEl: HTMLElement): boolean {
        return (this.getStyle(nativeEl, 'position') || 'static' ) === 'static';
    }

    private parentOffsetEl(nativeEl: HTMLElement): any {
        let offsetParent: any = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }
}
