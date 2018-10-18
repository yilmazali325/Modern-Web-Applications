import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-acomponent [list]="list" [show]=true [colorToChange]="color" (changeElementColorEvent)="displayMsg($event)"></app-acomponent>
            {{msg}}`,
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  list = ['CS401-MPP','CS472-WAP','CS435-SWE','CS427-ALG','CS572-MWA']
  color = "blue";
  msg:string;
  displayMsg(e){
    this.msg=e;
  }
}
