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
  protected addControls(): void {
    this.parentForm.addControl(
      'posX',
      new FormControl(ShapeDefaultsConstants.CIRCLE.left)
    );
    this.parentForm.addControl(
      'posY',
      new FormControl(ShapeDefaultsConstants.CIRCLE.top)
    );
    this.parentForm.addControl(
      'radius',
      new FormControl(ShapeDefaultsConstants.CIRCLE.radius)
    );
  }

  protected buildShape(): IShapeCommand {
    return {
      shape: ShapeEnum.Circle,
      left: this.parentForm.get('posX')?.value,
      top: this.parentForm.get('posY')?.value,
      fill: this.parentForm.get('color')?.value.hexValue,
      radius: this.parentForm.get('radius')?.value,
    } as IShapeCommand;
  }
}
