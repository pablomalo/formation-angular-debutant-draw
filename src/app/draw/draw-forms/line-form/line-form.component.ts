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
    this.parentForm.addControl(
      'ptAposX',
      new FormControl(
        ShapeDefaultsConstants.LINE.points
          ? ShapeDefaultsConstants.LINE.points[0]
          : 0
      )
    );
    this.parentForm.addControl(
      'ptAposY',
      new FormControl(
        ShapeDefaultsConstants.LINE.points
          ? ShapeDefaultsConstants.LINE.points[1]
          : 0
      )
    );
    this.parentForm.addControl(
      'ptBposX',
      new FormControl(
        ShapeDefaultsConstants.LINE.points
          ? ShapeDefaultsConstants.LINE.points[2]
          : 0
      )
    );
    this.parentForm.addControl(
      'ptBposY',
      new FormControl(
        ShapeDefaultsConstants.LINE.points
          ? ShapeDefaultsConstants.LINE.points[3]
          : 0
      )
    );
    this.parentForm.addControl(
      'strokeWidth',
      new FormControl(ShapeDefaultsConstants.LINE.strokeWidth)
    );
  }

  protected buildShape(): IShapeCommand {
    return {
      shape: ShapeEnum.Line,
      stroke: this.parentForm.get('color')?.value.hexValue,
      points: [
        this.parentForm.get('ptAposX')?.value,
        this.parentForm.get('ptAposY')?.value,
        this.parentForm.get('ptBposX')?.value,
        this.parentForm.get('ptBposY')?.value,
      ],
      strokeWidth: this.parentForm.get('strokeWidth')?.value,
    } as IShapeCommand;
  }
}
