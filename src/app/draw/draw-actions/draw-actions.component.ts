import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawService } from '../services/draw/draw.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ShapeEnum } from '../enums/shape.enum';
import { IColor } from '../interfaces/color.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormContainerComponent } from '../draw-forms/form-container/form-container.component';
import { COLORS } from '../helpers/constants/color.constants';
import { PersistenceService } from '../services/persistence/persistence.service';

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
    private readonly drawService: DrawService,
    private readonly persistenceService: PersistenceService,
    private readonly dialog: MatDialog
  ) {}

  private _activeColor!: IColor;

  get activeColor(): IColor {
    return this._activeColor;
  }

  set activeColor(color: IColor) {
    this.drawService.nextActiveColor(color);
  }

  ngOnInit(): void {
    this.drawService.penState$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((state: boolean): void => {
        this.isPenStateActive = state;
      });

    this.drawService.activeColor$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((color: IColor): void => {
        this._activeColor = color;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(undefined);
    this._unsubscribe$.complete();
  }

  onTogglePen = (): void => this.drawService.togglePen();

  onOpenDialog = (shape: ShapeEnum): void => {
    this.dialog.open(FormContainerComponent, {
      data: { shape: shape },
      width: '600px',
    });
  };

  save = (): void => {
    this.persistenceService.save();
  };

  load = (): void => {
    const drawings: Observable<object> = this.persistenceService.list();
    drawings.subscribe((drawings: any) => {
      const last: any = drawings[drawings.length - 1];
      this.drawService.canvasFabric.loadFromJSON(last, () =>
        this.drawService.canvasFabric.renderAll()
      );
    });
  };
}
