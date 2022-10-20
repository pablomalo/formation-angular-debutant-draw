import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShapeDefaultsConstants } from '../../draw-actions/constants/shape-defaults.constants';
import { IColor } from '../../draw-actions/interfaces/color.interface';
import { ColorConstants } from '../../draw-actions/constants/color.constants';
import { MatDialogRef } from '@angular/material/dialog';
import { DrawService } from '../../services/draw.service';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';

@Component({
  selector: 'app-circle-form',
  templateUrl: './circle-form.component.html',
  styleUrls: ['./circle-form.component.scss'],
})
export class CircleFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    posX: new FormControl(ShapeDefaultsConstants.CIRCLE.left),
    posY: new FormControl(ShapeDefaultsConstants.CIRCLE.top),
    radius: new FormControl(ShapeDefaultsConstants.CIRCLE.radius),
  });
  colorOptions: IColor[] = ColorConstants.COLORS;
  activeColor: IColor = ColorConstants.DEFAULT_COLOR;

  constructor(
    private readonly dialogRef: MatDialogRef<CircleFormComponent>,
    private readonly drawServices: DrawService
  ) {}

  onSubmit(): void {
    this.drawServices.addShape({
      shape: ShapeEnum.Circle,
      left: this.formGroup.get('posX')?.value,
      top: this.formGroup.get('posY')?.value,
      fill: this.activeColor.hexValue,
      radius: this.formGroup.get('radius')?.value,
    });
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
