import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';
import { ShapeDefaultsConstants } from '../../draw-actions/constants/shape-defaults.constants';
import { AbstractFormDirective } from '../abstract-form/abstract-form.directive';
import { IShapeCommand } from '../../draw-actions/interfaces/shape-command.interface';

@Component({
  selector: 'app-line-form',
  templateUrl: './line-form.component.html',
  styleUrls: ['./line-form.component.scss'],
})
export class LineFormComponent extends AbstractFormDirective {
  protected readonly shapeEnum: ShapeEnum = ShapeEnum.Line;
  protected readonly shapeDefaults: IShapeCommand = ShapeDefaultsConstants.LINE;

  protected addControls(): void {
    this.parentFormGroup.addControl(
      'coordAX',
      new FormControl(
        this.shapeDefaults.points ? this.shapeDefaults.points[0] : 0,
        this.coordinateXValidator()
      )
    );
    this.parentFormGroup.addControl(
      'coordAY',
      new FormControl(
        this.shapeDefaults.points ? this.shapeDefaults.points[1] : 0,
        this.coordinateYValidator()
      )
    );
    this.parentFormGroup.addControl(
      'coordBX',
      new FormControl(
        this.shapeDefaults.points ? this.shapeDefaults.points[2] : 0,
        this.coordinateXValidator()
      )
    );
    this.parentFormGroup.addControl(
      'coordBY',
      new FormControl(
        this.shapeDefaults.points ? this.shapeDefaults.points[3] : 0,
        this.coordinateYValidator()
      )
    );
    this.parentFormGroup.addControl(
      'strokeWidth',
      new FormControl(this.shapeDefaults.strokeWidth)
    );
  }

  protected buildShape(): IShapeCommand {
    return {
      stroke: this.parentFormGroup.get('color')?.value.hexValue,
      points: [
        this.parentFormGroup.get('coordAX')?.value,
        this.parentFormGroup.get('coordAY')?.value,
        this.parentFormGroup.get('coordBX')?.value,
        this.parentFormGroup.get('coordBY')?.value,
      ],
      strokeWidth: this.parentFormGroup.get('strokeWidth')?.value,
    } as IShapeCommand;
  }
}
