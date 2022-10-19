import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('colorSelect') colorSelect!: ElementRef;

  isPenStateActive: boolean = false;

  colorOptions: IColor[] = ColorConstants.COLORS;

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

  // TODO Stricter typing on $event
  onColorSelect($event: any) {
    this.drawServices.nextActiveColor($event.target.value);
  }
}
