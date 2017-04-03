import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ax-example',
    templateUrl: './example.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('./example.scss').toString(),
    ],
})
export class ExampleComponent {

    public selectedTab: string;

    constructor(activatedRoute: ActivatedRoute, private router: Router) {
        activatedRoute.params.subscribe(params => {
            this.selectedTab = params['tab'] || 'controls';
        });
    }

    public selectTab(tab: string) {
        this.router.navigate(['/example', { tab }]);
    }
}
