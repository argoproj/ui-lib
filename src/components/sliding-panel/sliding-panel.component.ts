import {
    Component, EventEmitter, Input, Output, Directive, ViewChild, AfterContentInit, OnDestroy
} from '@angular/core';
import { SlidingPanelService } from './sliding-panel.service';

@Component({
    selector: 'ax-sliding-panel',
    templateUrl: './sliding-panel.html',
    styles: [ require('./_sliding-panel.scss').toString() ]
})
export class SlidingPanelComponent implements AfterContentInit, OnDestroy {

    @Input()
    set show(isShown: boolean) {
        this.isShown = isShown;

        if (this.offCanvas) {
            this.slidingPanelService.openedPanelOffCanvas(isShown);
            return;
        }

        this.slidingPanelService.openPanel(isShown);
    };

    @Input()
    hasCloseButton: boolean = true;

    @Input()
    hasNoPadding: boolean = false;

    @Input()
    isNarrow: boolean = false;

    @Input()
    offCanvas: boolean = false;

    @Input()
    isMiddle: boolean = false;

    @Output()
    closePanel: EventEmitter<SlidingPanelComponent> = new EventEmitter<SlidingPanelComponent>();

    @ViewChild('panelHeader')
    private panelHeader;

    @ViewChild('panelFooter')
    private panelFooter;

    private isShown: boolean = false;
    private hasHeader: boolean;
    private hasFooter: boolean;

    constructor(private slidingPanelService: SlidingPanelService) {
    }

    public ngAfterContentInit() {
        this.hasHeader = this.panelHeader.nativeElement.children.length > 0;
        this.hasFooter = this.panelFooter.nativeElement.children.length > 0;
    }

    public ngOnDestroy() {
        this.show = false;
    }

    public close() {
        this.closePanel.emit(this);
    }
}

@Directive({ selector: 'sliding-panel-header' })
export class SlidingPanelHeaderDirective {}

@Directive({ selector: 'sliding-panel-body' })
export class SlidingPanelBodyDirective {}

@Directive({ selector: 'sliding-panel-footer' })
export class SlidingPanelFooterDirective {}
