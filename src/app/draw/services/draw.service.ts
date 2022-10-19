import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { fabric } from 'fabric';
import { ShapeEnum } from '../draw-actions/enums/shape.enum';
import { IShapeCommand } from '../draw-actions/interfaces/shape-command.interface';
import { ShapeDefaultsConstants } from '../draw-actions/constants/shape-defaults.constants';
import { ColorConstants } from '../draw-actions/constants/color.constants';
import { IColor } from '../draw-actions/interfaces/color.interface';

@Injectable({
  providedIn: 'root',
})
export class DrawService {
  selectedColor: IColor = ColorConstants.DEFAULT_COLOR;

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
    this._canvasFabric.freeDrawingBrush.color = this.selectedColor.hexValue;
  };

  addShape: Function = (shapeCommand: IShapeCommand): void => {
    switch (shapeCommand.shape) {
      case ShapeEnum.Rectangle:
        this._canvasFabric.add(
          new fabric.Rect({
            ...ShapeDefaultsConstants.RECTANGLE,
            ...shapeCommand,
            fill: this.selectedColor.hexValue,
          })
        );
        break;
      case ShapeEnum.Circle:
        this._canvasFabric.add(
          new fabric.Circle({
            ...ShapeDefaultsConstants.CIRCLE,
            ...shapeCommand,
            fill: this.selectedColor.hexValue,
          })
        );
        break;
      case ShapeEnum.Line:
        const mergedCommand = {
          ...ShapeDefaultsConstants.LINE,
          ...shapeCommand,
          stroke: this.selectedColor.hexValue,
        };
        console.log(shapeCommand, ShapeDefaultsConstants.LINE, mergedCommand);
        this._canvasFabric.add(
          new fabric.Line(mergedCommand.points, mergedCommand)
        );
        break;
    }
  };
}
