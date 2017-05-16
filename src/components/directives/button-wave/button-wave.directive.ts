import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[axButtonWave]' })
export class ButtonWaveDirective {

    constructor(private el: ElementRef) {
    }

    @HostListener('click', ['$event']) onMouseEnter(e) {
        let posX = this.el.nativeElement.offsetLeft,
            posY = this.el.nativeElement.offsetTop,
            buttonWidth = this.el.nativeElement.offsetWidth,
            buttonHeight =  this.el.nativeElement.offsetHeight,
            offsetParent = this.el.nativeElement.offsetParent;

        // Get all offset parents and add left and top position
        for (; offsetParent !== null; offsetParent = offsetParent.offsetParent) {
            posX +=  offsetParent.offsetLeft;
            posY +=  offsetParent.offsetTop;
        }

        // Remove wave if exists
        let wave = this.el.nativeElement.querySelector('.wave');
        wave && wave.remove();

        // Add new wave
        this.el.nativeElement.insertAdjacentHTML('beforeend', '<span class="wave"></span>');

        if(buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        // Get the center of the element
        let x = e.pageX - posX - buttonWidth / 2;
        let y = e.pageY - posY - buttonHeight / 2;

        // Set style for a new wave
        wave = this.el.nativeElement.querySelector('.wave');
        wave.style.width = buttonWidth + 'px';
        wave.style.height = buttonHeight + 'px';
        wave.style.top = y + 'px';
        wave.style.left = x + 'px';
    }
}
