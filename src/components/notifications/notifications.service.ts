import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NotificationTypes, Notification } from './notification.model';

const INTERNAL_ERROR = 'Internal error encountered.';

@Injectable()
export class NotificationsService {
    public static create(domSanitizer: DomSanitizer): NotificationsService {
        if (!NotificationsService.instance) {
            NotificationsService.instance = new NotificationsService(domSanitizer);
        }
        return NotificationsService.instance;
    }

    private static instance: NotificationsService;

    public notifications: Notification[] = [];

    constructor(private domSanitizer: DomSanitizer) {}

    public success(content: string | SafeHtml) {
        this.createNotification(NotificationTypes.Success, content);
    }

    public warning(content: string | SafeHtml) {
        this.createNotification(NotificationTypes.Warning, content);
    }

    public error(content: string | SafeHtml) {
        this.createNotification(NotificationTypes.Error, content);
    }

    public internalError() {
        this.createNotification(NotificationTypes.Error, INTERNAL_ERROR);
    }

    public close(index: number) {
        this.notifications.splice(index, 1);
    }

    private createNotification(type: NotificationTypes, content: string | SafeHtml) {
        let htmlContent: SafeHtml;
        if (typeof content === 'string') {
            htmlContent = this.domSanitizer.bypassSecurityTrustHtml(this.domSanitizer.sanitize(SecurityContext.HTML, content));
        } else {
            htmlContent = content as SafeHtml;
        }
        // hide all previous messages
        this.notifications.length = 0;
        let newNotificationIndex = this.notifications.push({ content: htmlContent, type }) - 1;

        // Autohide
        setTimeout(() => {
            this.close(newNotificationIndex);
        }, 5000);
    }
}
