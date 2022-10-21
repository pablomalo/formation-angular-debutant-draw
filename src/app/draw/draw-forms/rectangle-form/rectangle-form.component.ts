import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShapeEnum } from '../../enums/shape.enum';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { IShapeCommand } from '../../interfaces/shape-command.interface';
import { RECTANGLE } from '../../helpers/constants/shape-defaults.constants';

@Component({
  selector: 'app-rectangle-form',
  templateUrl: './rectangle-form.component.html',
  styleUrls: ['./rectangle-form.component.scss'],
})
export class RectangleFormComponent extends AbstractFormComponent {
  protected readonly shapeEnum: ShapeEnum = ShapeEnum.Rectangle;
  protected readonly shapeDefaults: IShapeCommand = RECTANGLE;

  protected addControls(): void {
    this.parentFormGroup.addControl(
      'left',
      new FormControl(this.shapeDefaults.left, this.coordinateXValidator())
    );
    this.parentFormGroup.addControl(
      'top',
      new FormControl(this.shapeDefaults.top, this.coordinateYValidator())
    );
    this.parentFormGroup.addControl(
      'width',
      new FormControl(this.shapeDefaults.width)
    );
    this.parentFormGroup.addControl(
      'height',
      new FormControl(this.shapeDefaults.height)
    );
  }

  protected buildShape(): IShapeCommand {
    return {
      left: this.parentFormGroup.get('left')?.value,
      top: this.parentFormGroup.get('top')?.value,
      fill: this.parentFormGroup.get('color')?.value.hexValue,
      width: this.parentFormGroup.get('width')?.value,
      height: this.parentFormGroup.get('height')?.value,
    } as IShapeCommand;
  }
}
