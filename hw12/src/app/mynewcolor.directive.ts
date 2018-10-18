import { Directive, Input, HostBinding, HostListener, EventEmitter, Output } from '@angular/core';
import { AcomponentComponent } from './acomponent.component';


@Directive({
  selector: '[changeColor]'
})
export class MynewcolorDirective {
  @Input()color: string;
  @Output()changeColorEvent: EventEmitter<string>;
  @HostBinding('style.color') elementColor;
  @HostListener('click') changeColor(){
    this.elementColor = this.color;
    this.changeColorEvent.emit(this.elementColor);
  }
  constructor() {
    this.changeColorEvent = new EventEmitter();
   }
}
