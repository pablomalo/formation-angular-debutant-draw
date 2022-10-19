import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Subject, takeUntil } from 'rxjs';
import { Shape } from './enums/shape';

@Component({
  selector: 'app-draw-actions',
  templateUrl: './draw-actions.component.html',
  styleUrls: ['./draw-actions.component.scss'],
})
export class DrawActionsComponent implements OnInit, OnDestroy {
  isPenStateActive: boolean = false;

  private _unsubscribe$: Subject<undefined> = new Subject<undefined>();

  constructor(private readonly drawServices: DrawService) {}

  ngOnInit(): void {
    this.drawServices.penState
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((state: boolean): void => {
        this.isPenStateActive = state;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(undefined);
    this._unsubscribe$.complete();
  }

  onTogglePen: Function = (): void => this.drawServices.togglePen();

  onAddRectangle: Function = (): void =>
    this.drawServices.addShape({
      shape: Shape.Rectangle,
      width: 100,
      height: 100,
      fill: 'blue',
      opacity: 1,
      left: 10,
      top: 35,
    });

  onAddCircle: Function = (): void =>
    this.drawServices.addShape({
      shape: Shape.Circle,
      fill: 'red',
      opacity: 1,
      left: 50,
      top: 75,
      radius: 30,
    });
}
