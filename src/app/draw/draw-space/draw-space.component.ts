import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fabric} from "fabric";
import {DrawServicesService} from "../draw-services/draw-services.service";

@Component({
  selector: 'app-draw-space',
  templateUrl: './draw-space.component.html',
  styleUrls: ['./draw-space.component.scss']
})
export class DrawSpaceComponent implements OnInit {

  @ViewChild('drawSpace') canvasRef!: ElementRef;

  private _canvasFabric!: fabric.Canvas;

  constructor(private readonly drawServices: DrawServicesService) {
  }

  ngOnInit(): void {
    this._canvasFabric = new fabric.Canvas(
      'draw-space',
      {
        backgroundColor: 'lightgrey',
        selection: false,
        preserveObjectStacking: true,
        width: 800,
        height: 600
      }
    );
    this.drawServices.penState.subscribe((state: boolean) => (this._canvasFabric.isDrawingMode = state));
  }
}
