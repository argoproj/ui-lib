import { Directive, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import * as Clipboard from 'clipboard';

/**
 * Add this directive to any button
 * Remember to add attribute like [attr.data-clipboard-text]="<copy string>"
 * to the button and you are good to go
 */
@Directive({
    selector: '[ax-copy-btn]',
})

export class CopyButtonDirective implements AfterViewInit, OnDestroy {
    private clipboardInstance;
    constructor(private elementRef: ElementRef) {
    }

    public ngAfterViewInit() {
        this.initializeClipboard();
    }

    public ngOnDestroy() {
        if (this.clipboardInstance) {
            this.clipboardInstance.destroy();
        }
    }

    private initializeClipboard() {
        this.clipboardInstance = new Clipboard(this.elementRef.nativeElement);
    }
}
