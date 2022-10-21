import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MIN_CANVAS_OVERLAP,
} from '../../helpers/constants/size.constants';
import { ShapeEnum } from '../../enums/shape.enum';
import { IShapeCommand } from '../../interfaces/shape-command.interface';
import { DrawService } from '../../services/draw/draw.service';

@Component({
  template: '',
})
export abstract class AbstractFormComponent implements OnInit {
  @Input() parentFormGroup!: FormGroup;
  @Input() submitEvent$!: Observable<void>;
  maxXCoordinate: number = CANVAS_WIDTH - MIN_CANVAS_OVERLAP;
  maxYCoordinate: number = CANVAS_HEIGHT - MIN_CANVAS_OVERLAP;
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

  public coordinateXValidator(): ValidatorFn {
    return this.getMinMaxError(0, this.maxXCoordinate, 'coordinateXError');
  }

  public coordinateYValidator(): ValidatorFn {
    return this.getMinMaxError(0, this.maxYCoordinate, 'coordinateYError');
  }

  protected abstract addControls(): void;

  protected abstract buildShape(): IShapeCommand;

  private getMinMaxError: Function =
    (minValue: number, maxValue: number, errorKey: string): ValidatorFn =>
    (control: AbstractControl): ValidationErrors | null => {
      if ('number' !== typeof control.value) {
        return null;
      }
      if (control.value < minValue || control.value > maxValue) {
        return {
          [errorKey]: `minMaxError`, // The message itself is irrelevant, only the key is likely to be referenced.
        };
      }
      return null;
    };
}
