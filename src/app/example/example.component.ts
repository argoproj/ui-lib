import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DateRange  } from '../../components';

@Component({
    selector: 'ax-example',
    templateUrl: './example.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('../../assets/styles/gui-lib.scss').toString(),
        require('./example.scss').toString(),
    ],
})
export class ExampleComponent  implements OnInit {

    dateRangeInput = DateRange.today();
    carouselImages =  [
        'https://datadog-live.imgix.net/img/Integrations-ActiveMQ-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Airbrake-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-AWS-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Ansible-340x216.png',
        'https://datadog-live.imgix.net/img/apache.png',
        'https://datadog-live.imgix.net/img/Integrations-ApacheTomcat-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Bitbucket-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Btrfs-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-bugsnag-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Cacti-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Campfire-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Capistrano-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Cassandra-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-catchpoint-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-CentOS-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-ceph-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Chatwork-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Chef-340x216.png',
        'https://datadog-live.imgix.net/img/cloudhealth-1.png',
        'https://datadog-live.imgix.net/img/Integrations-AWSCloudtrail-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Consul-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-CoreOS-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Couchbase-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-CouchDB-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Debian-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Docker-340x2161.png',
        'https://datadog-live.imgix.net/img/Integrations-Dyn-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-Elasticsearch-340x216.png',
        'https://datadog-live.imgix.net/img/Integrations-etcD-340x216.png',
    ];
    icons = [];
    testMarkdown = '###Applatix is awesome!';
    tableItems = [];

    constructor(private http: Http) {}

    public async ngOnInit() {
        for (let i = 0; i < 100; i++ ) {
            this.tableItems.push(this.tableItems.length);
        }
        let iconsCss = await this.http.get('/assets/styles/_ax-icons-auto.scss').toPromise().then(res => res.text());
        for (let line of iconsCss.split('\n')) {
            let match = line.match('[.](ax-icon-.*):before');
            if (match && match.length > 1) {
                this.icons.push(match[1]);
            }
        }
    }
}
