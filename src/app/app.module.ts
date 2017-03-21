import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ExampleComponent } from './example/example.component';
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
        HttpModule,
    ]
})
export class AppModule {
    
}
