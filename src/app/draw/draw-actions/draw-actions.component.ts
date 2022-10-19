import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawServicesService } from '../draw-services/draw-services.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-draw-actions',
  templateUrl: './draw-actions.component.html',
  styleUrls: ['./draw-actions.component.scss'],
})
export class DrawActionsComponent implements OnInit, OnDestroy {
  isPenStateActive: boolean = false;

  private _unsubscribe$: Subject<undefined> = new Subject<undefined>();

  constructor(private readonly drawServices: DrawServicesService) {}

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
}
