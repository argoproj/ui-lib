import { Injectable } from '@angular/core';

import { NotificationTypes, Notification } from './notification.model';

const INTERNAL_ERROR = 'Internal error encountered.';

@Injectable()
export class NotificationsService {
    public static create(): NotificationsService {
        if (!NotificationsService.instance) {
            NotificationsService.instance = new NotificationsService();
        }
        return NotificationsService.instance;
    }

    private static instance: NotificationsService;


    public notifications: Notification[] = [];
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
        this.createNotification(NotificationTypes.Error, INTERNAL_ERROR);
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
