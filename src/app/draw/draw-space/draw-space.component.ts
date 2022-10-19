import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawService } from '../services/draw.service';

@Component({
  selector: 'app-draw-space',
  templateUrl: './draw-space.component.html',
  styleUrls: ['./draw-space.component.scss'],
})
export class DrawSpaceComponent implements OnInit {
  @ViewChild('drawSpace') canvasRef!: ElementRef;

  constructor(private readonly drawServices: DrawService) {}

  ngOnInit(): void {
    this.drawServices.initCanvas();
  }
}
