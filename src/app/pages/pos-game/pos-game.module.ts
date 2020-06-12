import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosGameRoutingModule } from './pos-game-routing.module';
import { PosGameComponent } from './pos-game.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [PosGameComponent],
  imports: [
    CommonModule,
    PosGameRoutingModule,
    MaterialModule
  ]
})
export class PosGameModule { }
