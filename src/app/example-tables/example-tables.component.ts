import { Component } from '@angular/core';

@Component({
    selector: 'ax-example-tables',
    templateUrl: './example-tables.html',
})
export class ExampleTablesComponent {
    public tableItems = [];

    constructor() {
        for (let i = 0; i < 100; i++) {
            this.tableItems.push(this.tableItems.length);
        }
    }
}
