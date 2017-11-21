import {Directive, HostListener, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Input} from '@angular/core';
import {TooltipContentComponent} from './tooltip-content.component';

@Directive({
    selector: '[ax-tooltip]',
})
export class TooltipDirective {
    @Input('ax-tooltip')
    public content: string | TooltipContentComponent;

    @Input()
    public tooltipDisabled: boolean;

    @Input()
    public tooltipAnimation: boolean = true;

    @Input()
    public tooltipPlacement: 'top'|'bottom'|'left'|'right' = 'bottom';

    private tooltip: ComponentRef<TooltipContentComponent>;
    private visible: boolean;

    constructor(private viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver) {
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    public show(): void {
        if (this.tooltipDisabled || this.visible) {
            return;
        }

        this.visible = true;
        if (typeof this.content === 'string') {
            let factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
            if (!this.visible) {
                return;
            }

            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltip.instance.content = this.content as string;
            this.tooltip.instance.placement = this.tooltipPlacement;
            this.tooltip.instance.animation = this.tooltipAnimation;
        } else {
            const tooltip = this.content as TooltipContentComponent;
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.tooltipPlacement;
            tooltip.animation = this.tooltipAnimation;
            tooltip.show();
        }
    }

    @HostListener('mouseout', ['$event'])
    public hide(event?): void {
        let isOnTooltip: boolean = $(event.toElement).hasClass('tooltip-inner');

        if (!this.visible || isOnTooltip) {
            return;
        }

        this.visible = false;
        if (this.tooltip) {
            this.tooltip.destroy();
        }

        if (this.content instanceof TooltipContentComponent) {
            (this.content as TooltipContentComponent).hide();
        }
    }
}
