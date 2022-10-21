import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { IShapeCommand } from '../../draw-actions/interfaces/shape-command.interface';
import { CIRCLE } from '../../helpers/shape-defaults.constants';

@Component({
  selector: 'app-circle-form',
  templateUrl: './circle-form.component.html',
  styleUrls: ['./circle-form.component.scss'],
})
export class CircleFormComponent extends AbstractFormComponent {
  protected readonly shapeEnum: ShapeEnum = ShapeEnum.Circle;
  protected readonly shapeDefaults: IShapeCommand = CIRCLE;

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
      'radius',
      new FormControl(this.shapeDefaults.radius)
    );
  }

  protected buildShape(): IShapeCommand {
    return {
      left: this.parentFormGroup.get('left')?.value,
      top: this.parentFormGroup.get('top')?.value,
      fill: this.parentFormGroup.get('color')?.value.hexValue,
      radius: this.parentFormGroup.get('radius')?.value,
    } as IShapeCommand;
  }
}
