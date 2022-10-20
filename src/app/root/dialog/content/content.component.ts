import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  myFormGroup: FormGroup = new FormGroup({
    myInput1: new FormControl('', Validators.minLength(2)),
    myInput2: new FormControl('', Validators.required),
  });

  constructor() {}

  show(): void {
    console.log(this.myFormGroup);
  }
}
