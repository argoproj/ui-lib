import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

let marked = require('marked');
marked.setOptions({
  pedantic: false,
  gfm: true,
});

@Component({
    selector: 'ax-markdown',
    template: '<div [innerHTML]="html"></div>',
})
export class MarkdownComponent {

    public html: SafeHtml;

    @Input()
    public set markdown(value: string) {
        this.html = this.sanitized.bypassSecurityTrustHtml(marked(value));
    }

    constructor(private sanitized: DomSanitizer) {}
}
