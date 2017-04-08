import { Component, Input, ViewChild } from '@angular/core';
import { DropDownComponent } from '../dropdown/dropdown.component';

export interface MenuItem {
    title: string;
    iconName: string;
    action: () => any;
}

export class DropdownMenuSettings {
    icon: string;
    menu: MenuItem[] = [];

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
    settings: DropdownMenuSettings;

    @Input()
    customClass: string;

    @ViewChild('dateRangeDropdown')
    public dateRangeDropdown: DropDownComponent;

    byTitle(item: MenuItem) {
        return item.title;
    }

    close() {
        this.dateRangeDropdown.close();
    }

    open() {
        this.dateRangeDropdown.open();
    }    
}
