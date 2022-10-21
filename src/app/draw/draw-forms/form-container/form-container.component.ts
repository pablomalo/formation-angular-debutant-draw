import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ShapeEnum } from '../../enums/shape.enum';
import { IColor } from '../../interfaces/color.interface';
import { Subject } from 'rxjs';
import { MappingService } from '../../services/mapping/mapping.service';
import { COLORS } from '../../helpers/constants/color.constants';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit {
  containerFormGroup!: FormGroup;
  ShapeEnum: typeof ShapeEnum = ShapeEnum;
  colorOptions: IColor[] = COLORS;
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
  }

  onSubmit() {
    this.submitSubject$.next(); // Trigger submit in children components
    this.dialogRef.close();
  }

  onCancel($event: Event): void {
    this.dialogRef.close();
    $event.preventDefault();
  }
}
