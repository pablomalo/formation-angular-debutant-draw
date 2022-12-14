import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawSpaceComponent } from './draw-space/draw-space.component';
import { DrawActionsComponent } from './draw-actions/draw-actions.component';
import { DrawService } from './services/draw/draw.service';
import { ButtonActiveDirective } from './helpers/directives/button-active.directive';
import { UppercasePipe } from './helpers/pipes/uppercase.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { RectangleFormComponent } from './draw-forms/rectangle-form/rectangle-form.component';
import { LineFormComponent } from './draw-forms/line-form/line-form.component';
import { CircleFormComponent } from './draw-forms/circle-form/circle-form.component';
import { FormContainerComponent } from './draw-forms/form-container/form-container.component';
import { MatIconModule } from '@angular/material/icon';
import { DialogTitleComponent } from './draw-forms/dialog-title/dialog-title.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';

@NgModule({
  providers: [DrawService],
  declarations: [
    DrawSpaceComponent,
    DrawActionsComponent,
    ButtonActiveDirective,
    UppercasePipe,
    RectangleFormComponent,
    LineFormComponent,
    CircleFormComponent,
    FormContainerComponent,
    DialogTitleComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    NgxLoadingButtonsModule,
  ],
  exports: [DrawSpaceComponent, DrawActionsComponent],
})
export class DrawModule {}
