import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawServicesService } from '../services/draw-services.service';

@Component({
  selector: 'app-draw-space',
  templateUrl: './draw-space.component.html',
  styleUrls: ['./draw-space.component.scss'],
})
export class DrawSpaceComponent implements OnInit {
  @ViewChild('drawSpace') canvasRef!: ElementRef;

  constructor(private readonly drawServices: DrawServicesService) {}

  ngOnInit(): void {
    this.drawServices.initCanvas();
  }
}
