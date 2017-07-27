import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Tab } from './tab.interface';
import { TabsComponent } from './tabs.component';

@Component({
    selector: 'ax-tab',
    templateUrl: './tab.component.html',
})
export class TabComponent implements OnInit, OnDestroy, Tab {
    @Input() public tabTitle: string;
    @Input() public tabIcon: string;
    @Input() public tabKey: string;
    @Input() public isOnlyContentScrollable: boolean = false;
    @Input() public extraVerticalScrollPadding: number = 0;
    @Input() public extraHorizontalScrollPadding: number = 0;
    @Input() public noPadding: boolean = false;

    constructor(private tabsComponent: TabsComponent) {}

    public ngOnInit() {
        this.tabsComponent.addTab(this);
    }

    public ngOnDestroy() {
        this.tabsComponent.removeTab(this);
    }

    get selected(): boolean {
        return this.tabsComponent.isTabSelected(this);
    }
}
