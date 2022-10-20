import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Subject, takeUntil } from 'rxjs';
import { ShapeEnum } from './enums/shape.enum';
import { IColor } from './interfaces/color.interface';
import { ColorConstants } from './constants/color.constants';
import { MatDialog } from '@angular/material/dialog';
import { RectangleFormComponent } from '../draw-forms/rectangle-form/rectangle-form.component';
import { LineFormComponent } from '../draw-forms/line-form/line-form.component';
import { CircleFormComponent } from '../draw-forms/circle-form/circle-form.component';

@Component({
  selector: 'app-draw-actions',
  templateUrl: './draw-actions.component.html',
  styleUrls: ['./draw-actions.component.scss'],
})
export class DrawActionsComponent implements OnInit, OnDestroy {
  isPenStateActive: boolean = false;

  colorOptions: IColor[] = ColorConstants.COLORS;

  ShapeEnum = ShapeEnum;

  private _unsubscribe$: Subject<undefined> = new Subject<undefined>();

  constructor(
    readonly drawServices: DrawService,
    private readonly dialog: MatDialog
  ) {}

  private _activeColor!: IColor;

  get activeColor(): IColor {
    return this._activeColor;
  }

  set activeColor(color: IColor) {
    this.drawServices.nextActiveColor(color);
  }

  ngOnInit(): void {
    this.drawServices.penState$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((state: boolean): void => {
        this.isPenStateActive = state;
      });

    this.drawServices.activeColor$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((color: IColor): void => {
        this._activeColor = color;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(undefined);
    this._unsubscribe$.complete();
  }

  onTogglePen: Function = (): void => this.drawServices.togglePen();

  onOpenDialog: Function = (shape: ShapeEnum): void => {
    switch (shape) {
      case ShapeEnum.Rectangle:
        this.dialog.open(RectangleFormComponent);
        break;
      case ShapeEnum.Circle:
        this.dialog.open(CircleFormComponent);
        break;
      case ShapeEnum.Line:
        this.dialog.open(LineFormComponent);
        break;
      default:
        break;
    }
  };
}
