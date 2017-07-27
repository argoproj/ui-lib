import { Component, Input } from '@angular/core';
import { NotificationsService } from '.';
import { NotificationTypes, Notification } from './notification.model';

@Component({
    selector: 'ax-notifications',
    templateUrl: './notifications.component.html',
    styles: [ require('./notifications.scss').toString() ],
})
export class NotificationsComponent {

    public notifications: Notification[];
    public notificationTypes = NotificationTypes;

    @Input()
    public leftOffset = 0;

    constructor(private notificationsService: NotificationsService) {
        this.notifications = notificationsService.notifications;
    }

    public close(index: number) {
        this.notificationsService.close(index);
    }
}
