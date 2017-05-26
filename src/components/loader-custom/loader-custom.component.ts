import {Component, Input} from '@angular/core';

@Component({
    selector: 'ax-loader-custom',
    templateUrl: './loader-custom.html',
    styles: [ require('./loader-custom.scss').toString() ],
})

export class LoaderCustomComponent {
    public loaderStyle: {
        color: string,
        backgroundColor: string,
        size: number,
        position: string,
    } = {
        color: 'gunmetal',
        backgroundColor: 'black',
        size: 30,
        position: 'center',
    };

    @Input() set color(value: string) { // white, gunmetal, red
        this.loaderStyle.color = 'custom-circle__' + value;
    }

    @Input('background-color') set backgroundColor(value: string) {
        this.loaderStyle.backgroundColor = value;
    }

    @Input() set size(value: number) {
        this.loaderStyle.size = value;
    }

    @Input() set position(value: string) {
        this.loaderStyle.position = value;
    }
}
