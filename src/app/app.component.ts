import { Component, ViewEncapsulation } from '@angular/core';
import {  } from '../components';

@Component({
    selector: 'ax-app',
    templateUrl: './app.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('../assets/styles/gui-lib.scss').toString(),
    ],
})
export class AppComponent {

}
