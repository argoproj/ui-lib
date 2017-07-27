import 'rxjs/Rx';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));

if (module['hot']) {
    // Reload page if any angular module has changed. CSS changes will be injected without page reload.
    module['hot'].accept();
}
