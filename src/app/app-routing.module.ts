import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';

const routes: Routes = [{ path: 'lifecycle', component: LifeCycleComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
