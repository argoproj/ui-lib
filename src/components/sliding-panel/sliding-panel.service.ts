import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SlidingPanelService {

    public static create(): SlidingPanelService {
        if (!SlidingPanelService.instance) {
            SlidingPanelService.instance = new SlidingPanelService();
        }
        return SlidingPanelService.instance;
    }

    private static instance: SlidingPanelService;

    public panelOpened = new EventEmitter<boolean>();
    public panelOffCanvasOpened = new EventEmitter<boolean>();

    public openPanel(hideScrollbar: boolean) {
        this.panelOpened.emit(hideScrollbar);
    }

    public openedPanelOffCanvas(panelOffCanvas: boolean) {
        this.panelOffCanvasOpened.emit(panelOffCanvas);
    }
}
