import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DrawService } from '../../services/draw.service';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';
import { ShapeDefaultsConstants } from '../../draw-actions/constants/shape-defaults.constants';
import { IColor } from '../../draw-actions/interfaces/color.interface';
import { ColorConstants } from '../../draw-actions/constants/color.constants';

@Component({
  selector: 'app-rectangle-form',
  templateUrl: './rectangle-form.component.html',
  styleUrls: ['./rectangle-form.component.scss'],
})
export class RectangleFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    posX: new FormControl(ShapeDefaultsConstants.RECTANGLE.left),
    posY: new FormControl(ShapeDefaultsConstants.RECTANGLE.top),
    width: new FormControl(ShapeDefaultsConstants.RECTANGLE.width),
    height: new FormControl(ShapeDefaultsConstants.RECTANGLE.height),
  });
  colorOptions: IColor[] = ColorConstants.COLORS;
  activeColor: IColor = ColorConstants.DEFAULT_COLOR;

  constructor(
    private readonly dialogRef: MatDialogRef<RectangleFormComponent>,
    private readonly drawServices: DrawService
  ) {}

  onSubmit(): void {
    this.drawServices.addShape({
      shape: ShapeEnum.Rectangle,
      left: this.formGroup.get('posX')?.value,
      top: this.formGroup.get('posY')?.value,
      fill: this.activeColor.hexValue,
      width: this.formGroup.get('width')?.value,
      height: this.formGroup.get('height')?.value,
    });
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
