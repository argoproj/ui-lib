import { Component } from '@angular/core';

@Component({
    selector: 'ax-example-other',
    templateUrl: './example-other.html',
})
export class ExampleOtherComponent {
    public carouselImages =  [
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

    public testMarkdown = `
    # README #

This is the Applatix App Store repo. It contains

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
