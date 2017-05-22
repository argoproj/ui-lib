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
import { LogsComponent } from './logs/logs.component';
import {
    SlidingPanelComponent, SlidingPanelHeaderDirective,
    SlidingPanelBodyDirective, SlidingPanelFooterDirective,
} from './sliding-panel/sliding-panel.component';
import { SlidingPanelService } from './sliding-panel/sliding-panel.service';
import { SwipeCheckboxComponent } from './swipe-checkbox/swipe-checkbox.component';
import { ButtonWaveDirective } from './directives/button-wave/button-wave.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll/infinite-scroll.directive';
import { LabelPlaceholderReactiveDirective } from './directives/label-as-placeholder/label-placeholder-reactive.directive';
import { LabelPlaceholderDirective } from './directives/label-as-placeholder/label-placeholder.directive';
import { SelectComponent } from './select/select.component';

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
    SlidingPanelComponent,
    SlidingPanelHeaderDirective,
    SlidingPanelBodyDirective,
    SlidingPanelFooterDirective,
    SwipeCheckboxComponent,
    LogsComponent,
    ButtonWaveDirective,
    InfiniteScrollDirective,
    LabelPlaceholderDirective,
    LabelPlaceholderReactiveDirective,
    SelectComponent,
];

@NgModule({
    declarations: components,
    entryComponents: [TooltipContentComponent],
    exports: components.concat(NotificationsModule),
    providers: [{
        provide: SlidingPanelService,
        useFactory: () => SlidingPanelService.create(),
    }],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
})
export class GuiComponentsModule {
}
