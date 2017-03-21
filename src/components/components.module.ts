import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropDownComponent, DropdownAnchorDirective, DropdownContentDirective } from './dropdown/dropdown.component';
import { DropDownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CopyButtonDirective } from './copy-btn/copy.directive';
import { DateRangeSelectorComponent } from './date-range-selector/date-range-selector.component';
import { DateRangeDropDownComponent } from './date-range-dropdown/date-range-dropdown.component';
import { MarkdownComponent } from './markdown/markdown.component';
import { NotificationsModule } from './notifications';
import { RadioboxComponent } from './radiobox/radiobox.component';
import { SwitchComponent } from './switch/switch.component';
import { TabComponent } from './tabs/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { TooltipContentComponent, TooltipDirective } from './tooltip';

let components = [
    CheckboxComponent,
    DropDownComponent,
    DropDownMenuComponent,
    DropdownAnchorDirective,
    DropdownContentDirective,
    CarouselComponent,
    CopyButtonDirective,
    DateRangeSelectorComponent,
    DateRangeDropDownComponent,
    MarkdownComponent,
    RadioboxComponent,
    SwitchComponent,
    TabComponent,
    TabsComponent,
    TooltipContentComponent,
    TooltipDirective,
];

@NgModule({
    declarations: components,
    entryComponents: [TooltipContentComponent],
    exports: components.concat(NotificationsModule),
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
})
export class GuiComponentsModule {
}
