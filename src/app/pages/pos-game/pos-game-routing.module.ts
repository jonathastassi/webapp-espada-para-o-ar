import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosGameComponent } from './pos-game.component';

const routes: Routes = [{ path: '', component: PosGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosGameRoutingModule { }
