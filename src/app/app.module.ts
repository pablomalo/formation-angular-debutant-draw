import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-component/app.component';
import { DrawModule } from './draw/draw.module';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';

@NgModule({
  declarations: [AppComponent, LifeCycleComponent],
  imports: [BrowserModule, AppRoutingModule, DrawModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
