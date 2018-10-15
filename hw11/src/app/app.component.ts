import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<button (click)="decrease()">-</button>
                             {{value}}
             <button (click)="increase()">+</button>`,
  styles: [],
  inputs:['value']
  
})
export class AppComponent {
  value:number;
  constructor(){
    this.value=1;
  }
  increase(){
    this.value = this.value +1;
    return false;
  }
  decrease(){
    this.value = this.value -1;
  }
}
