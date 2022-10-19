import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fabric } from 'fabric';
import { DrawServicesService } from '../draw-services/draw-services.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-draw-space',
  templateUrl: './draw-space.component.html',
  styleUrls: ['./draw-space.component.scss'],
})
export class DrawSpaceComponent implements OnInit, OnDestroy {
  @ViewChild('drawSpace') canvasRef!: ElementRef;

  private _canvasFabric!: fabric.Canvas;

  private _unsubscribe$: Subject<undefined> = new Subject<undefined>();

  constructor(private readonly drawServices: DrawServicesService) {}

  ngOnInit(): void {
    this._canvasFabric = new fabric.Canvas('draw-space', {
      backgroundColor: 'lightgrey',
      selection: false,
      preserveObjectStacking: true,
      width: 800,
      height: 600,
    });
    this.drawServices.penState
      .pipe(
        takeUntil(this._unsubscribe$), // Jusqu'à ce que l'événement ait été déclenché au moins une fois.
        tap((state: boolean) => console.log(state))
      )
      .subscribe(
        (state: boolean) => (this._canvasFabric.isDrawingMode = state)
      );
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(undefined);
    this._unsubscribe$.complete();
  }
}
