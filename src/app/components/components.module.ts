import { TopHeaderComponent } from './layout/top-header/top-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ChronometerComponent } from './chronometer/chronometer.component';

@NgModule({
  declarations: [
    TopHeaderComponent,
    ChronometerComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    TopHeaderComponent,
    ChronometerComponent
  ]
})
export class ComponentsModule { }
