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

  public get activeColor$(): BehaviorSubject<IColor> {
    return this._activeColor$;
  }

  public get penState$(): BehaviorSubject<boolean> {
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
    const freeDrawingBrush = this._canvasFabric.freeDrawingBrush;
    freeDrawingBrush.width = 3;
    this._activeColor$.subscribe(
      (color: IColor) => (freeDrawingBrush.color = color.hexValue)
    );
  };

  togglePen: Function = (): void => {
    this._penState$.next(!this._penState$.value);
    this._canvasFabric.isDrawingMode = this._penState$.value;
    this._canvasFabric.freeDrawingBrush.color =
      this._activeColor$.value.hexValue;
  };

  nextActiveColor(color: IColor | string): void {
    const nextColor =
      'string' === typeof color ? ColorConstants.findByHexValue(color) : color;
    this._activeColor$.next(nextColor);
  }

  addShape: Function = (shapeCommand: IShapeCommand): void => {
    const mergedCommand: IShapeCommand =
      this._mergeCommandDefaults(shapeCommand);

    let obj: fabric.Object | null = ((): fabric.Object | null => {
      switch (shapeCommand.shape) {
        case ShapeEnum.Rectangle:
          const rect = new fabric.Rect(mergedCommand);
          this._subscribeToActiveColor(rect, 'fill');
          return rect;
        case ShapeEnum.Circle:
          const circle = new fabric.Circle(mergedCommand);
          this._subscribeToActiveColor(circle, 'fill');
          return circle;
        case ShapeEnum.Line:
          const line = new fabric.Line(mergedCommand.points, mergedCommand);
          this._subscribeToActiveColor(line, 'stroke');
          return line;
        default:
          return null;
      }
    })();

    if (obj) {
      this._canvasFabric.add(obj);
    }
  };

  private _subscribeToActiveColor: Function = (
    shape: fabric.Object,
    colorProperty: string
  ): void => {
    this._activeColor$.subscribe(
      (color: IColor) =>
        (shape[colorProperty as keyof fabric.Object] = color.hexValue)
    );
  };

  private _mergeCommandDefaults: Function = (
    shapeCommand: IShapeCommand
  ): IShapeCommand => {
    const shapeToDefaultsMap = {
      [ShapeEnum.Rectangle]: ShapeDefaultsConstants.RECTANGLE,
      [ShapeEnum.Circle]: ShapeDefaultsConstants.CIRCLE,
      [ShapeEnum.Line]: ShapeDefaultsConstants.LINE,
    };
    return {
      ...shapeToDefaultsMap[shapeCommand.shape],
      ...shapeCommand,
    } as IShapeCommand;
  };
}
