import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CheckboxComponent } from './checkbox/checkbox.component';

let components = [
    CheckboxComponent,
];

@NgModule({
    declarations: components,
    exports: components,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
})
export class GuiComponentsModule {
}
