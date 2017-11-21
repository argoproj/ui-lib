import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'ax-example-other',
    templateUrl: './example-other.html',
})
export class ExampleOtherComponent {

    public logsSource = {
        loadLogs(): Observable<string> {
            return Observable.create(observer => {
                let colors = ['\u001b[0;92m', '\u001b[0;34m', '\u001b[0;31m', '\u001b[0;33m'];
                let i = 0;

                function addLogs() {
                    if (i++ < 10) {
                        observer.next(`${colors[i % colors.length]}${i} - Test log Test log Test log Test log Test log Test log Test log Test log` +
                         ` Test log Test log Test log Test log Test log Test log Test log Test log Test log Test log Test log Test log Test log` +
                         ` Test log Test log\n`);
                        setTimeout(addLogs, 1000);
                    }
                }
                addLogs();
            });
        },
        getKey(): string {
            return 'test';
        },
    };

    public testMarkdown = `
    # README #

This is the Argo App Store repo. It contains

* The service templates for the published apps.
* The build scripts, Dockerfiles, and source codes needed to build the images to support the service templates.
* The README files for each app, containing info on how to use the service templates, and pointers to public github repos that we have used to test them.

## Language Support

* [Golang](golang/README.md)
* [Java](java/README.md)
* [Nodejs](nodejs/README.md)
* [Python](python/README.md)

## Database Support

* [Mysql](mysql/README.md)`;
}
