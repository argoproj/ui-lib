import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'ax-example-icons',
    templateUrl: './example-icons.html',
})
export class ExampleIconsComponent implements OnInit {
    public icons = [];

    constructor(private http: Http) {
    }

    public async ngOnInit() {
        let iconsCss = await this.http.get('/assets/styles/_ax-icons-auto.scss').toPromise().then(res => res.text());
        for (let line of iconsCss.split('\n')) {
            let match = line.match('[.](ax-icon-.*):before');
            if (match && match.length > 1) {
                this.icons.push(match[1]);
            }
        }
    }
}
