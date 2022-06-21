import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aurinn-train';
  
  origin: any;
  
  receiveEvent($event: any) {
    this.origin = $event
  }
  
}
