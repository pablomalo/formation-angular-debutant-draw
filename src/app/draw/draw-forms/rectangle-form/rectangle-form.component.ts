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
    this.parentForm.addControl(
      'posX',
      new FormControl(ShapeDefaultsConstants.RECTANGLE.left)
    );
    this.parentForm.addControl(
      'posY',
      new FormControl(ShapeDefaultsConstants.RECTANGLE.top)
    );
    this.parentForm.addControl(
      'width',
      new FormControl(ShapeDefaultsConstants.RECTANGLE.width)
    );
    this.parentForm.addControl(
      'height',
      new FormControl(ShapeDefaultsConstants.RECTANGLE.height)
    );
  }

  protected buildShape(): IShapeCommand {
    return {
      shape: ShapeEnum.Rectangle,
      left: this.parentForm.get('posX')?.value,
      top: this.parentForm.get('posY')?.value,
      fill: this.parentForm.get('color')?.value.hexValue,
      width: this.parentForm.get('width')?.value,
      height: this.parentForm.get('height')?.value,
    } as IShapeCommand;
  }
}
