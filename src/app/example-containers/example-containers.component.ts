import { Component, ViewChild, OnInit } from '@angular/core';

import { PopupService, PopupConfirmationComponent } from '../../components';

@Component({
    selector: 'ax-example-containers',
    templateUrl: './example-containers.html',
})
export class ExampleContainersComponent implements OnInit {

    @ViewChild(PopupConfirmationComponent)
    public confirmationPopup: PopupConfirmationComponent;

    constructor(public popupService: PopupService) {
    }

    public ngOnInit() {
        this.popupService.init({ confirmationPopup: this.confirmationPopup });
    }
}
