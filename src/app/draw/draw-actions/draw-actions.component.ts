import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Subject, takeUntil } from 'rxjs';
import { ShapeEnum } from './enums/shape.enum';
import { IColor } from './interfaces/color.interface';
import { ColorConstants } from './constants/color.constants';

@Component({
  selector: 'app-draw-actions',
  templateUrl: './draw-actions.component.html',
  styleUrls: ['./draw-actions.component.scss'],
})
export class DrawActionsComponent implements OnInit, OnDestroy {
  isPenStateActive: boolean = false;

  colorOptions: IColor[] = ColorConstants.COLORS;
  private _unsubscribe$: Subject<undefined> = new Subject<undefined>();

  constructor(readonly drawServices: DrawService) {}

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

    this.drawServices.activeColor$.subscribe((color: IColor): void => {
      this._activeColor = color;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(undefined);
    this._unsubscribe$.complete();
  }

  onTogglePen: Function = (): void => this.drawServices.togglePen();

  onAddRectangle: Function = (): void =>
    this.drawServices.addShape({
      shape: ShapeEnum.Rectangle,
    });

  onAddCircle: Function = (): void =>
    this.drawServices.addShape({
      shape: ShapeEnum.Circle,
    });

  onAddLine: Function = (): void =>
    this.drawServices.addShape({
      shape: ShapeEnum.Line,
    });
}
