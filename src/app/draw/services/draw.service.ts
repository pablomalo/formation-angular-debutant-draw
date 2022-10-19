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
  private _canvasFabric!: fabric.Canvas;

  private readonly _penState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private _activeColor$: BehaviorSubject<IColor> = new BehaviorSubject<IColor>(
    ColorConstants.DEFAULT_COLOR
  );

  public get penState(): BehaviorSubject<boolean> {
    return this._penState$;
  }

  initCanvas: Function = (): void => {
    this._canvasFabric = new fabric.Canvas('draw-space', {
      backgroundColor: 'lightgrey',
      selection: false,
      preserveObjectStacking: true,
      width: 800,
      height: 600,
    });
    this._activeColor$.subscribe(
      (color: IColor) =>
        (this._canvasFabric.freeDrawingBrush.color = color.hexValue)
    );
  };

  nextActiveColor(color: IColor | string): void {
    const nextColor =
      'string' === typeof color
        ? ColorConstants.findColorByHexValue(color)
        : color;
    this._activeColor$.next(nextColor);
  }

  togglePen: Function = (): void => {
    this._penState$.next(!this._penState$.value);
    this._canvasFabric.isDrawingMode = this._penState$.value;
    this._canvasFabric.freeDrawingBrush.color =
      this._activeColor$.value.hexValue;
  };

  addShape: Function = (shapeCommand: IShapeCommand): void => {
    switch (shapeCommand.shape) {
      case ShapeEnum.Rectangle:
        const rect = new fabric.Rect({
          ...ShapeDefaultsConstants.RECTANGLE,
          ...shapeCommand,
        });
        this._activeColor$.subscribe(
          (color: IColor) => (rect.fill = color.hexValue)
        );
        this._canvasFabric.add(rect);
        break;
      case ShapeEnum.Circle:
        const circle = new fabric.Circle({
          ...ShapeDefaultsConstants.CIRCLE,
          ...shapeCommand,
        });
        this._activeColor$.subscribe(
          (color: IColor) => (circle.fill = color.hexValue)
        );
        this._canvasFabric.add(circle);
        break;
      case ShapeEnum.Line:
        const mergedCommand = {
          ...ShapeDefaultsConstants.LINE,
          ...shapeCommand,
        };
        const line = new fabric.Line(mergedCommand.points, mergedCommand);
        this._activeColor$.subscribe(
          (color: IColor) => (line.stroke = color.hexValue)
        );
        this._canvasFabric.add(line);
        break;
    }
  };
}
