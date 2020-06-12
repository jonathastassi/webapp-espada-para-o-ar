import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreGameRoutingModule } from './pre-game-routing.module';
import { PreGameComponent } from './pre-game.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PreGameComponent],
  imports: [
    CommonModule,
    PreGameRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class PreGameModule { }
