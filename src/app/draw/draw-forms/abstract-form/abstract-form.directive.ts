import { Directive, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DrawService } from '../../services/draw/draw.service';
import { IShapeCommand } from '../../draw-actions/interfaces/shape-command.interface';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';
import { SizeConstants } from '../../draw-actions/constants/size.constants';

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

  protected coordinateXValidator(): ValidatorFn {
    return this.getMinMaxError(0, SizeConstants.CANVAS_WIDTH);
  }

  protected coordinateYValidator(): ValidatorFn {
    return this.getMinMaxError(0, SizeConstants.CANVAS_HEIGHT);
  }

  protected abstract addControls(): void;

  protected abstract buildShape(): IShapeCommand;

  private getMinMaxError: Function =
    (minValue: number, maxValue: number): ValidatorFn =>
    (control: AbstractControl): ValidationErrors | null => {
      if (control.value < minValue || control.value > maxValue) {
        return {
          error: `Minimum ${minValue}, maximum ${maxValue}`,
        };
      }
      return null;
    };
}
