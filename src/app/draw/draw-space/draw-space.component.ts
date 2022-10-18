import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fabric} from "fabric";

@Component({
  selector: 'app-draw-space',
  templateUrl: './draw-space.component.html',
  styleUrls: ['./draw-space.component.scss']
})
export class DrawSpaceComponent implements OnInit {

  @ViewChild('drawSpace') canvasRef!: ElementRef;

  protected _canvasFabric?: fabric.Canvas;

  constructor() {
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
    this._canvasFabric.isDrawingMode = true;
  }

}
