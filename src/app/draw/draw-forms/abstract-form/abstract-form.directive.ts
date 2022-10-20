import { Directive, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DrawService } from '../../services/draw.service';
import { IShapeCommand } from '../../draw-actions/interfaces/shape-command.interface';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';

@Directive()
export abstract class AbstractFormDirective implements OnInit {
  @Input() parentFormGroup!: FormGroup;
  @Input() submitEvent$!: Observable<void>;
  protected abstract readonly shapeEnum: ShapeEnum;
  protected abstract readonly shapeDefaults: IShapeCommand;
  private _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly drawService: DrawService) {}

  ngOnInit(): void {
    this.addControls();

    this.submitEvent$.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
      this.onSubmit();
    });
  }

  onSubmit(): void {
    this.drawService.addShape({ ...this.buildShape(), shape: this.shapeEnum });
  }

  protected abstract addControls(): void;

  protected abstract buildShape(): IShapeCommand;
}
