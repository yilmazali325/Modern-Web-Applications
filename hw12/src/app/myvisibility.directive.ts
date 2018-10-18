import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[visibility]'
})
export class MyvisibilityDirective {
  @Input() visible:boolean;
  @HostBinding('style.display') show;
  
  constructor() { 
    this.show='block';
    this.visible=true;
  }
  
  ngOnInit(){
    if(this.visible===false){
      this.show='none';
    }
  }

}
