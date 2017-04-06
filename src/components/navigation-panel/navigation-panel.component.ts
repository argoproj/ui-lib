import { Component, AfterContentInit, Input, ViewChild, Output, EventEmitter, OnDestroy, Directive, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'ax-navigation-panel',
    templateUrl: './navigation-panel.component.html',
    styles: [ require('./navigation-panel.component.scss').toString() ],
    encapsulation: ViewEncapsulation.None,
})

export class NavigationPanelComponent implements AfterContentInit, OnDestroy {

    public showFooter: boolean;

    @Output()
    public onClose = new EventEmitter();

    @Input()
    public show: boolean;

    @Input()
    public hideCloseBtn: boolean;

    @ViewChild('panelFooter')
    private panelFooter;

    private routerEventsSubscription: Subscription;

    constructor(private router: Router) {
        this.routerEventsSubscription = router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.close();
            }
        });
    }

    public ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe();
    }

    public ngAfterContentInit() {
        this.showFooter = this.panelFooter.nativeElement.children.length > 0;
    }

    public close() {
        this.onClose.emit(false);
    }
}
/* tslint:disable */
@Directive({ selector: 'panel-header' })
export class PanelHeaderDirective {}

@Directive({ selector: 'panel-body' })
export class PanelBodyDirective {}

@Directive({ selector: 'panel-footer' })
export class PanelFooterDirective {}
/* tslint:enable */
