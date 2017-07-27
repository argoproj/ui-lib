import { Component, Input, ViewChild } from '@angular/core';
import { DropDownComponent } from '../dropdown/dropdown.component';

export interface MenuItem {
    title: string;
    iconName: string;
    action: () => any;
}

export class DropdownMenuSettings {
    public icon: string;
    public menu: MenuItem[] = [];

    public constructor(menu: {title: string, iconName: string, action: () => any}[], icon?: string) {
        this.menu = menu;
        this.icon = icon || 'plus';
    }
}

@Component({
    selector: 'ax-dropdown-menu',
    templateUrl: './dropdown-menu.html',
})
export class DropDownMenuComponent {

    @Input()
    public settings: DropdownMenuSettings;

    @Input()
    public customClass: string;

    @ViewChild('dateRangeDropdown')
    public dateRangeDropdown: DropDownComponent;

    public byTitle(item: MenuItem) {
        return item.title;
    }

    public close() {
        this.dateRangeDropdown.close();
    }
}
