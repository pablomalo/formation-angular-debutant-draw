import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawSpaceComponent } from './draw-space/draw-space.component';



@NgModule({
  declarations: [
    DrawSpaceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DrawSpaceComponent
  ]
})
export class DrawModule { }
