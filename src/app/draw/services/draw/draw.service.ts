import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { fabric } from 'fabric';
import { ShapeEnum } from '../../enums/shape.enum';
import { IShapeCommand } from '../../interfaces/shape-command.interface';
import { IColor } from '../../interfaces/color.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  DEFAULT,
  findColorByHexValue,
} from '../../helpers/constants/color.constants';
import {
  CIRCLE,
  LINE,
  RECTANGLE,
} from '../../helpers/constants/shape-defaults.constants';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from '../../helpers/constants/size.constants';

@Injectable({
  providedIn: 'root',
})
export class DrawService implements OnDestroy, OnInit {
  private _canvasFabric!: fabric.Canvas;

  private readonly _penState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly http: HttpClient) {}

  private _activeColor$: BehaviorSubject<IColor> = new BehaviorSubject<IColor>(
    DEFAULT
  );

  public get activeColor$(): BehaviorSubject<IColor> {
    return this._activeColor$;
  }

  public get penState$(): BehaviorSubject<boolean> {
    return this._penState$;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribe$.next(undefined);
    this._unsubscribe$.complete();
  }

  initCanvas: Function = (): void => {
    this._canvasFabric = new fabric.Canvas('draw-space', {
      backgroundColor: 'lightgrey',
      selection: false,
      preserveObjectStacking: true,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });
    const freeDrawingBrush = this._canvasFabric.freeDrawingBrush;
    freeDrawingBrush.width = 3;
    this._activeColor$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((color: IColor) => (freeDrawingBrush.color = color.hexValue));
  };

  list: Function = (): Observable<Object> =>
    this.http.get(`${environment.apiUrl}/shapes`);

  togglePen: Function = (): void => {
    this._penState$.next(!this._penState$.value);
    this._canvasFabric.isDrawingMode = this._penState$.value;
    this._canvasFabric.freeDrawingBrush.color =
      this._activeColor$.value.hexValue;
  };

  nextActiveColor(color: IColor | string): void {
    const nextColor =
      'string' === typeof color ? findColorByHexValue(color) : color;
    this._activeColor$.next(nextColor);
  }

  addShape: Function = (shapeCommand: IShapeCommand): void => {
    const mergedCommand: IShapeCommand =
      this._mergeCommandDefaults(shapeCommand);

    let obj: fabric.Object | null = ((): fabric.Object | null => {
      switch (shapeCommand.shape) {
        case ShapeEnum.Rectangle:
          // this._subscribeToActiveColor(rect, 'fill');
          return new fabric.Rect(mergedCommand);
        case ShapeEnum.Circle:
          // this._subscribeToActiveColor(circle, 'fill');
          return new fabric.Circle(mergedCommand);
        case ShapeEnum.Line:
          // this._subscribeToActiveColor(line, 'stroke');
          return new fabric.Line(mergedCommand.points, mergedCommand);
        default:
          return null;
      }
    })();

    if (obj) {
      this._canvasFabric.add(obj);
    }
  };

  // TODO Remove me
  private _subscribeToActiveColor: Function = (
    shape: fabric.Object,
    colorProperty: string
  ): void => {
    this._activeColor$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (color: IColor) =>
          (shape[colorProperty as keyof fabric.Object] = color.hexValue)
      );
  };

  private _mergeCommandDefaults: Function = (
    shapeCommand: IShapeCommand
  ): IShapeCommand => {
    const shapeToDefaultsMap = {
      [ShapeEnum.Rectangle]: RECTANGLE,
      [ShapeEnum.Circle]: CIRCLE,
      [ShapeEnum.Line]: LINE,
    };
    return {
      ...shapeToDefaultsMap[shapeCommand.shape],
      ...shapeCommand,
    } as IShapeCommand;
  };
}
