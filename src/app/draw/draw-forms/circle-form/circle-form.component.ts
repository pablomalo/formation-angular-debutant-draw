import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShapeDefaultsConstants } from '../../draw-actions/constants/shape-defaults.constants';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';
import { AbstractFormDirective } from '../abstract-form/abstract-form.directive';
import { IShapeCommand } from '../../draw-actions/interfaces/shape-command.interface';

@Component({
  selector: 'app-circle-form',
  templateUrl: './circle-form.component.html',
  styleUrls: ['./circle-form.component.scss'],
})
export class CircleFormComponent extends AbstractFormDirective {
  protected readonly shapeEnum: ShapeEnum = ShapeEnum.Circle;
  protected readonly shapeDefaults: IShapeCommand =
    ShapeDefaultsConstants.CIRCLE;

  protected addControls(): void {
    this.parentFormGroup.addControl(
      'left',
      new FormControl(this.shapeDefaults.left)
    );
    this.parentFormGroup.addControl(
      'top',
      new FormControl(this.shapeDefaults.top)
    );
    this.parentFormGroup.addControl(
      'radius',
      new FormControl(this.shapeDefaults.radius)
    );
  }

  protected buildShape(): IShapeCommand {
    return {
      shape: this.shapeEnum,
      left: this.parentFormGroup.get('left')?.value,
      top: this.parentFormGroup.get('top')?.value,
      fill: this.parentFormGroup.get('color')?.value.hexValue,
      radius: this.parentFormGroup.get('radius')?.value,
    } as IShapeCommand;
  }
}
