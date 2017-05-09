import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { GuiComponentsModule } from '../components';

import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { ExampleControlsComponent } from './example-controls/example-controls.component';
import { ExampleContainersComponent } from './example-containers/example-containers.component';
import { ExampleTablesComponent } from './example-tables/example-tables.component';
import { ExampleIconsComponent } from './example-icons/example-icons.component';
import { ExampleOtherComponent } from './example-other/example-other.component';

@NgModule({
    declarations: [
        AppComponent,
        ExampleComponent,
        ExampleControlsComponent,
        ExampleContainersComponent,
        ExampleTablesComponent,
        ExampleIconsComponent,
        ExampleOtherComponent,
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy,
    }],
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        FormsModule,
        GuiComponentsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: 'example', component: ExampleComponent },
            { path: '**', redirectTo: 'example' },
        ]),
    ],
})
export class AppModule {

}
