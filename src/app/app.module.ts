import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-component/app.component';
import { DrawModule } from './draw/draw.module';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, LifeCycleComponent],
  imports: [BrowserModule, AppRoutingModule, DrawModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
