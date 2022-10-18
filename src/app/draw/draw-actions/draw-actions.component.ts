import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-actions',
  templateUrl: './draw-actions.component.html',
  styleUrls: ['./draw-actions.component.scss']
})
export class DrawActionsComponent implements OnInit {
  clickAction: Function = () => (alert('Clicked!'));
  
  constructor() { }

  ngOnInit(): void {
  }

}
