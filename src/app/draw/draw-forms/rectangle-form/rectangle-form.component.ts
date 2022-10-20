import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShapeDefaultsConstants } from '../../draw-actions/constants/shape-defaults.constants';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';
import { AbstractFormDirective } from '../abstract-form/abstract-form.directive';
import { IShapeCommand } from '../../draw-actions/interfaces/shape-command.interface';

@Component({
  selector: 'app-rectangle-form',
  templateUrl: './rectangle-form.component.html',
  styleUrls: ['./rectangle-form.component.scss'],
})
export class RectangleFormComponent extends AbstractFormDirective {
  protected addControls(): void {
    this.parentFormGroup.addControl(
      'posX',
      new FormControl(ShapeDefaultsConstants.RECTANGLE.left)
    );
    this.parentFormGroup.addControl(
      'posY',
      new FormControl(ShapeDefaultsConstants.RECTANGLE.top)
    );
    this.parentFormGroup.addControl(
      'width',
      new FormControl(ShapeDefaultsConstants.RECTANGLE.width)
    );
    this.parentFormGroup.addControl(
      'height',
      new FormControl(ShapeDefaultsConstants.RECTANGLE.height)
    );
  }

  protected buildShape(): IShapeCommand {
    return {
      shape: ShapeEnum.Rectangle,
      left: this.parentFormGroup.get('posX')?.value,
      top: this.parentFormGroup.get('posY')?.value,
      fill: this.parentFormGroup.get('color')?.value.hexValue,
      width: this.parentFormGroup.get('width')?.value,
      height: this.parentFormGroup.get('height')?.value,
    } as IShapeCommand;
  }
}
