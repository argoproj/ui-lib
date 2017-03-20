import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GuiComponentsModule } from '../components';

@NgModule({
    declarations: [ AppComponent ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        GuiComponentsModule,
    ]
})
export class AppModule {
    
}
