import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DrawService } from '../../services/draw.service';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';
import { ShapeDefaultsConstants } from '../../draw-actions/constants/shape-defaults.constants';
import { IColor } from '../../draw-actions/interfaces/color.interface';
import { ColorConstants } from '../../draw-actions/constants/color.constants';

@Component({
  selector: 'app-line-form',
  templateUrl: './line-form.component.html',
  styleUrls: ['./line-form.component.scss'],
})
export class LineFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    ptAposX: new FormControl(
      ShapeDefaultsConstants.LINE.points
        ? ShapeDefaultsConstants.LINE.points[0]
        : 0
    ),
    ptAposY: new FormControl(
      ShapeDefaultsConstants.LINE.points
        ? ShapeDefaultsConstants.LINE.points[1]
        : 0
    ),
    ptBposX: new FormControl(
      ShapeDefaultsConstants.LINE.points
        ? ShapeDefaultsConstants.LINE.points[2]
        : 0
    ),
    ptBposY: new FormControl(
      ShapeDefaultsConstants.LINE.points
        ? ShapeDefaultsConstants.LINE.points[3]
        : 0
    ),
    strokeWidth: new FormControl(ShapeDefaultsConstants.LINE.strokeWidth),
  });
  colorOptions: IColor[] = ColorConstants.COLORS;
  activeColor: IColor = ColorConstants.DEFAULT_COLOR;

  constructor(
    private readonly dialogRef: MatDialogRef<LineFormComponent>,
    private readonly drawServices: DrawService
  ) {}

  onSubmit(): void {
    this.drawServices.addShape({
      shape: ShapeEnum.Line,
      stroke: this.activeColor.hexValue,
      points: [
        this.formGroup.get('ptAposX')?.value,
        this.formGroup.get('ptAposY')?.value,
        this.formGroup.get('ptBposX')?.value,
        this.formGroup.get('ptBposY')?.value,
      ],
      strokeWidth: this.formGroup.get('strokeWidth')?.value,
    });
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
