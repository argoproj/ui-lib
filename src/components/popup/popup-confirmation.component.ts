import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ax-popup-confirmation',
    template: `<ax-popup [show]="show">
        <div class="popup-confirmation">
            <div class="popup-confirmation__header">{{title}}</div>
            <p class="popup-confirmation__message">{{message}}</p>
            <div class="popup-confirmation__footer">
                <button class="ax-button ax-button--base" (click)="close(true)"> {{okButtonTitle}} </button>
                <button class="ax-button" (click)="close(false)"> {{cancelButtonTitle}} </button>
            </div>
        </div>
    </ax-popup>`,
    styles: [ require('./popup-confirmation.scss').toString() ],
})
export class PopupConfirmationComponent {
    @Input()
    public show = false;
    @Input()
    public cancelButtonTitle = 'Cancel';
    @Input()
    public okButtonTitle = 'Ok';
    @Input()
    public title = '';
    @Input()
    public message = '';
    @Output()
    public closed = new EventEmitter<{ confirmed: boolean }>();

    public close(confirmed: boolean) {
        this.closed.emit({ confirmed });
    }
}
