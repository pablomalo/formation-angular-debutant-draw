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
  protected addControls(): void {
    this.parentFormGroup.addControl(
      'ptAposX',
      new FormControl(
        ShapeDefaultsConstants.LINE.points
          ? ShapeDefaultsConstants.LINE.points[0]
          : 0
      )
    );
    this.parentFormGroup.addControl(
      'ptAposY',
      new FormControl(
        ShapeDefaultsConstants.LINE.points
          ? ShapeDefaultsConstants.LINE.points[1]
          : 0
      )
    );
    this.parentFormGroup.addControl(
      'ptBposX',
      new FormControl(
        ShapeDefaultsConstants.LINE.points
          ? ShapeDefaultsConstants.LINE.points[2]
          : 0
      )
    );
    this.parentFormGroup.addControl(
      'ptBposY',
      new FormControl(
        ShapeDefaultsConstants.LINE.points
          ? ShapeDefaultsConstants.LINE.points[3]
          : 0
      )
    );
    this.parentFormGroup.addControl(
      'strokeWidth',
      new FormControl(ShapeDefaultsConstants.LINE.strokeWidth)
    );
  }

  protected buildShape(): IShapeCommand {
    return {
      shape: ShapeEnum.Line,
      stroke: this.parentFormGroup.get('color')?.value.hexValue,
      points: [
        this.parentFormGroup.get('ptAposX')?.value,
        this.parentFormGroup.get('ptAposY')?.value,
        this.parentFormGroup.get('ptBposX')?.value,
        this.parentFormGroup.get('ptBposY')?.value,
      ],
      strokeWidth: this.parentFormGroup.get('strokeWidth')?.value,
    } as IShapeCommand;
  }
}
