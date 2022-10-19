import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawSpaceComponent } from './draw-space/draw-space.component';
import { DrawActionsComponent } from './draw-actions/draw-actions.component';
import { DrawServicesService } from './services/draw-services.service';
import { ButtonActiveDirective } from './draw-actions/directives/button-active.directive';
import { UppercasePipe } from './draw-actions/pipes/uppercase.pipe';

@NgModule({
  providers: [DrawServicesService],
  declarations: [
    DrawSpaceComponent,
    DrawActionsComponent,
    ButtonActiveDirective,
    UppercasePipe,
  ],
  imports: [CommonModule],
  exports: [DrawSpaceComponent, DrawActionsComponent],
})
export class DrawModule {}
