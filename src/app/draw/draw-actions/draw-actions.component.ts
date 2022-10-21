import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawService } from '../services/draw/draw.service';
import { Subject, takeUntil } from 'rxjs';
import { ShapeEnum } from '../enums/shape.enum';
import { IColor } from '../interfaces/color.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormContainerComponent } from '../draw-forms/form-container/form-container.component';
import { COLORS } from '../helpers/constants/color.constants';

@Component({
  selector: 'app-draw-actions',
  templateUrl: './draw-actions.component.html',
  styleUrls: ['./draw-actions.component.scss'],
})
export class DrawActionsComponent implements OnInit, OnDestroy {
  isPenStateActive: boolean = false;

  colorOptions: IColor[] = COLORS;

  ShapeEnum = ShapeEnum;

  private _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly drawServices: DrawService,
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
    this.dialog.open(FormContainerComponent, {
      data: { shape: shape },
      width: '600px',
    });
  };
}
