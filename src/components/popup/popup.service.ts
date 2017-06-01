import { Injectable } from '@angular/core';
import { PopupConfirmationComponent } from './popup-confirmation.component';

@Injectable()
export class PopupService {

    public static create(): PopupService {
        if (!PopupService.instance) {
            PopupService.instance = new PopupService();
        }
        return PopupService.instance;
    }

    private static instance: PopupService;
    private confirmationPopup: PopupConfirmationComponent;

    public init(params: { confirmationPopup: PopupConfirmationComponent }) {
        this.confirmationPopup = params.confirmationPopup;
    }

    public confirm(title: string, message: string, options?: { cancelButtonTitle: string, okButtonTitle: string }): Promise<boolean> {
        this.confirmationPopup.title = title;
        this.confirmationPopup.message = message;
        this.confirmationPopup.okButtonTitle = options && options.okButtonTitle || 'OK';
        this.confirmationPopup.cancelButtonTitle = options && options.cancelButtonTitle || 'Cancel';
        this.confirmationPopup.show = true;
        return this.confirmationPopup.closed.asObservable().toPromise().then(res => {
            this.confirmationPopup.show = false;
            return res.confirmed;
        });
    }
}
