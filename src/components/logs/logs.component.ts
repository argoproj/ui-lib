import { Component, Input, OnDestroy, ViewChild, NgZone, EventEmitter, Output, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NotificationsService } from '../notifications';

let Terminal = require('xterm');
Terminal.loadAddon('fit');

export interface LogsSource {
    getKey(): string;
    loadLogs(): Observable<string>;
}

@Component({
    selector: 'ax-logs',
    templateUrl: './logs.html',
    styles: [
        require('./logs.scss').toString(),
    ],
})
export class LogsComponent implements OnDestroy, AfterViewInit {
    @Input()
    public set source(source: LogsSource) {
        if (!source) {
            this.disposeSubscription();
            if (this.terminal) {
                this.terminal.reset();
            }
        } else if (!this.logsSource || this.logsSource.getKey() !== source.getKey()) {
            this.logsSource = source;
            this.refresh();
        }
    }

    @Input()
    public tailLogs = false;

    @Output()
    public logsLoaded: EventEmitter<any> = new EventEmitter();

    @ViewChild('container')
    public container: ElementRef;

    public noData: boolean = false;

    private subscriptions: Subscription[] = [];
    private terminal: any;
    private scrollback = 99999;
    private maxScrollbackReached = false;
    private logsSource: LogsSource;

    constructor(private zone: NgZone, private notificationsService: NotificationsService) {}

    public ngAfterViewInit() {
        this.terminal = new Terminal({
            scrollback: this.scrollback,
            theme: 'ax',
        });

        this.terminal.open(this.container.nativeElement);
        this.terminal.on('refresh', () => {
            if (!this.maxScrollbackReached && this.terminal.lines.length === this.scrollback) {
                this.maxScrollbackReached = true;
                this.notificationsService.warning(`Buffer size limit has been reached. Please use download button to get full log.`);
            }
        });
        this.terminal.fit();
    }

    public toggleTail() {
        this.tailLogs = !this.tailLogs;
    }

    public ngOnDestroy() {
        this.disposeSubscription();
        this.terminal.destroy();
    }

    @HostListener('window:resize', ['$event'])
    public onWindowResize() {
        if (this.terminal) {
            this.terminal.fit();
        }
    }

    public scrollToTop() {
        if (this.terminal) {
            this.terminal.scrollToTop();
        }
    }

    private disposeSubscription() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }

    private refresh() {
        this.maxScrollbackReached = false;
        if (this.terminal) {
            this.terminal.reset();
        }

        this.disposeSubscription();

        let logSource = this.logsSource.loadLogs();

        if (logSource) {
            this.subscriptions.push(logSource
                .bufferTime(100).filter(logs => logs.length > 0).subscribe(logs => {
                    this.noData = false;
                    this.logsLoaded.emit();
                    this.zone.run(() => {
                        logs.forEach(log => {
                            if (log) {
                                // Convert linux style line ending to windows style which is expected by xterm.
                                this.terminal.write(log.replace('\n', '\r\n'));
                            }
                        });
                        if (this.tailLogs) {
                            this.terminal.scrollToBottom();
                        }
                    });
                }, () => {
                    this.noData = true;
                }));
        } else {
            this.noData = true;
        }

    }
}
