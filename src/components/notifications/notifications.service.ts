import { Injectable } from '@angular/core';

import { NotificationTypes, Notification } from './notification.model';

@Injectable()
export class NotificationsService {
    public notifications: Notification[] = [];
    private Internal_Error = 'Internal error encountered.';
    public success(content: string) {
        this.createNotification(NotificationTypes.Success, content);
    }

    public warning(content: string) {
        this.createNotification(NotificationTypes.Warning, content);
    }

    public error(content: string) {
        this.createNotification(NotificationTypes.Error, content);
    }

    public internalError() {
        this.createNotification(NotificationTypes.Error, this.Internal_Error);
    }

    public close(index: number) {
        this.notifications.splice(index, 1);
    }

    private createNotification(type: NotificationTypes, content: string) {
        // hide all previous messages
        this.notifications.length = 0;
        let newNotificationIndex = this.notifications.push({ content, type }) - 1;

        // Autohide
        setTimeout(() => {
            this.close(newNotificationIndex);
        }, 5000);
    }
}
