import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'ax-popup',
    templateUrl: './popup.html',
    styles: [ require('./popup.scss').toString() ],
})
export class PopupComponent {
    @Input()
    public show: boolean = false;

    @Input()
    set width(val: number) {
        this.modalW = val;
    }

    private modalW: number = 400;
    private sanitizer: DomSanitizer;

    constructor(sanitizer: DomSanitizer) {
        this.sanitizer = sanitizer;
    }
}
