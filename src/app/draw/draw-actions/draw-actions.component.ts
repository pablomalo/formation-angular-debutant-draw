import { Component, OnInit } from '@angular/core';
import {DrawServicesService} from "../draw-services/draw-services.service";

@Component({
  selector: 'app-draw-actions',
  templateUrl: './draw-actions.component.html',
  styleUrls: ['./draw-actions.component.scss']
})
export class DrawActionsComponent implements OnInit {

  isPenStateActive: boolean = false;

  constructor(private readonly drawServices: DrawServicesService) {
  }

  ngOnInit(): void {
    this.drawServices.penState.subscribe((state: boolean) => (this.isPenStateActive = state))
  }

  togglePen: Function = () => (this.drawServices.togglePen());
}
