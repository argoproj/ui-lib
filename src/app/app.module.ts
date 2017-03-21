import { NgModule } from '@angular/core';
import { ExampleComponent } from './example.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GuiComponentsModule } from '../components';

@NgModule({
    declarations: [ ExampleComponent ],
    bootstrap: [ExampleComponent],
    imports: [
        BrowserModule,
        FormsModule,
        GuiComponentsModule,
    ]
})
export class AppModule {
    
}
