import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Tab} from './tab.interface';

@Component({
    selector: 'ax-tabs',
    templateUrl: './tabs.component.html',
    styles: [ require('./_tabs.scss').toString() ]
})
export class TabsComponent {
    public tabs: Tab[] = [];
    @Output() public selected = new EventEmitter();
    @Input() public selectedTabKey: string;
    @Input() public navCenter: boolean = false;

    public addTab(tab: Tab) {
        this.tabs.push(tab);
    }

    public removeTab(tab: Tab) {
        let index = this.tabs.indexOf(tab);
        if (index > -1) {
            this.tabs.splice(index, 1);
        }
    }

    public selectTab(tab: Tab) {
        this.selectedTabKey = tab.tabKey;
        this.selected.emit({selectedTab: tab});
    }

    public isTabSelected(tab: Tab) {
        return tab.tabKey === this.selectedTabKey;
    }
}
