import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Subject, takeUntil } from 'rxjs';
import { Shape } from './enums/shape';
import { Color } from './interfaces/color';
import { ColorConstants } from './constants/color.constants';

@Component({
  selector: 'app-draw-actions',
  templateUrl: './draw-actions.component.html',
  styleUrls: ['./draw-actions.component.scss'],
})
export class DrawActionsComponent implements OnInit, OnDestroy {
  @ViewChild('colorSelect') colorSelect!: ElementRef;

  isPenStateActive: boolean = false;

  colorOptions: Color[] = ColorConstants.COLORS;

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
      fill: this.colorSelect.nativeElement.value,
    });

  onAddCircle: Function = (): void =>
    this.drawServices.addShape({
      shape: Shape.Circle,
      fill: this.colorSelect.nativeElement.value,
    });

  onAddLine: Function = (): void =>
    this.drawServices.addShape({
      shape: Shape.Line,
      stroke: this.colorSelect.nativeElement.value,
    });
}
