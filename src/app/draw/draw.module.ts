import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawSpaceComponent } from './draw-space/draw-space.component';
import { DrawActionsComponent } from './draw-actions/draw-actions.component';
import { DrawServicesService } from './draw-services/draw-services.service';

@NgModule({
  providers: [DrawServicesService],
  declarations: [DrawSpaceComponent, DrawActionsComponent],
  imports: [CommonModule],
  exports: [DrawSpaceComponent, DrawActionsComponent],
})
export class DrawModule {}
