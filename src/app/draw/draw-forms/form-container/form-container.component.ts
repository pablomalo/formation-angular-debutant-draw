import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ShapeEnum } from '../../draw-actions/enums/shape.enum';
import { IColor } from '../../draw-actions/interfaces/color.interface';
import { ColorConstants } from '../../draw-actions/constants/color.constants';
import { Subject } from 'rxjs';
import { MappingService } from '../../services/mapping/mapping.service';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit {
  containerFormGroup!: FormGroup;
  ShapeEnum: typeof ShapeEnum = ShapeEnum;
  colorOptions: IColor[] = ColorConstants.COLORS;
  dialogTitle!: string;
  submitSubject$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<FormContainerComponent>
  ) {}

  ngOnInit(): void {
    this.containerFormGroup = new FormGroup({
      color: new FormControl(
        MappingService.mapShapeEnumToDefaultColor(this.data.shape)
      ),
    });

    this.dialogTitle = MappingService.mapShapeEnumToDialogTitle(
      this.data.shape
    );
  }

  onSubmit() {
    this.submitSubject$.next(); // Trigger submit in children components
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
