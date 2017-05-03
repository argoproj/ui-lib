import { SafeHtml } from '@angular/platform-browser';

export enum NotificationTypes {
    Success,
    Warning,
    Error,
}

export class Notification {
    public content: SafeHtml;
    public type: NotificationTypes;
}
