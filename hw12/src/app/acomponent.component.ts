import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-acomponent',
  template: `<ul visibility changeColor [visible]=show>
                <li changeColor [color]=colorToChange (changeColorEvent)="elementColorChange($event,item)" 
                  *ngFor="let item of list">{{item}}</li>
              </ul>`,
  //styleUrls: ['./acomponent.component.css']
})
export class AcomponentComponent implements OnInit {
  @Input() list:string[];
  @Input() show:boolean;
  @Input() colorToChange:string;
  @Output() changeElementColorEvent: EventEmitter<string>;
  constructor() { 
    this.changeElementColorEvent = new EventEmitter();
  }

  ngOnInit() {
  }
  
  elementColorChange(e,value){
    this.changeElementColorEvent.emit(`An element (${value}) changed its color to ${e}`);
  }

  

}
