import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { fabric } from 'fabric';
import { Shape } from '../draw-actions/enums/shape';
import { ShapeCommand } from '../draw-actions/interface/shape-command';

@Injectable({
  providedIn: 'root',
})
export class DrawServicesService {
  private readonly _penState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _canvasFabric!: fabric.Canvas;

  public get penState(): BehaviorSubject<boolean> {
    return this._penState$;
  }

  public initCanvas: Function = (): void => {
    this._canvasFabric = new fabric.Canvas('draw-space', {
      backgroundColor: 'lightgrey',
      selection: false,
      preserveObjectStacking: true,
      width: 800,
      height: 600,
    });
  };

  togglePen: Function = (): void => {
    this._penState$.next(!this._penState$.value);
    this._canvasFabric.isDrawingMode = this._penState$.value;
  };

  addShape: Function = (shapeCommand: ShapeCommand): void => {
    switch (shapeCommand.shape) {
      case Shape.Rectangle:
        this._canvasFabric.add(new fabric.Rect(shapeCommand));
        break;
      case Shape.Circle:
        this._canvasFabric.add(new fabric.Circle(shapeCommand));
        break;
    }
  };
}
