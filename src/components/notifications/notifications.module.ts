import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from './notifications.service';

@NgModule({
    declarations: [
        NotificationsComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        NotificationsComponent,
    ],
    providers: [{
        provide: NotificationsService,
        useFactory: (sanitizer: DomSanitizer) => NotificationsService.create(sanitizer),
        deps: [DomSanitizer],
    }],
})
export class NotificationsModule {
}
