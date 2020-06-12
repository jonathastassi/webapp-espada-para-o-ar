import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreGameComponent } from './pre-game.component';

const routes: Routes = [{ path: '', component: PreGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreGameRoutingModule { }
