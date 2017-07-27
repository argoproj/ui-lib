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
        return new Promise(resolve => {
            let subscription = this.confirmationPopup.closed.subscribe(res => {
                this.confirmationPopup.show = false;
                subscription.unsubscribe();
                resolve(res.confirmed);
            });
        });
    }
}
