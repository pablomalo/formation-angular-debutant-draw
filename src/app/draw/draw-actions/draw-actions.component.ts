import { Component, OnInit } from '@angular/core';
import {DrawServicesService} from "../draw-services/draw-services.service";

@Component({
  selector: 'app-draw-actions',
  templateUrl: './draw-actions.component.html',
  styleUrls: ['./draw-actions.component.scss']
})
export class DrawActionsComponent implements OnInit {

  clickAction: Function = () => (alert('Clicked!'));

  constructor(private readonly drawServices: DrawServicesService) {
  }

  penStateChange: Function = () => (this.drawServices.penStateChange());

  ngOnInit(): void {
  }
}
