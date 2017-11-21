import 'owl.carousel';
import * as $ from 'jquery';
import {
    Component,
    Input,
    ContentChild,
    TemplateRef,
    AfterViewChecked,
    ElementRef,
    ViewChild,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

const DEFAULT_OPTIONS = {
    margin: 10,
    nav: false,
    loop: true,
    responsive: false,
};

@Component({
    selector: 'ax-carousel',
    template: '<div class="owl-carousel" #container><template ngFor [ngForOf]="items" [ngForTemplate]="itemTemplate"></template></div>',
    styles: [ require('./_carousel.scss').toString() ],
})
export class CarouselComponent implements OnChanges {

    @Input()
    public items: any[] = [];
    @Input()
    public options: any = {};
    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(TemplateRef)
    public itemTemplate: TemplateRef<any>;

    private $owlElement: any;

    @ViewChild('container')
    private container: ElementRef;

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['items']) {
            this.applyCarousel();
        }
    }

    public next() {
        this.$owlElement.trigger('next.owl.carousel');
    }

    public prev() {
        this.$owlElement.trigger('prev.owl.carousel');
    }

    private applyCarousel() {
        if (this.$owlElement) {
            this.$owlElement.owlCarousel('destroy');
            this.$owlElement = null;
        }
        setTimeout(() => {
            this.$owlElement = $(this.container.nativeElement).owlCarousel(Object.assign({}, DEFAULT_OPTIONS, this.options));
            this.$owlElement.on('changed.owl.carousel', (e) => {
                this.onChange.emit(e);
            });
        });
    }
}
