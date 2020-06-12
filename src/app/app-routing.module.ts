import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'pre-game', loadChildren: () => import('./pages/pre-game/pre-game.module').then(m => m.PreGameModule) },
  { path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) },
  { path: 'pos-game', loadChildren: () => import('./pages/pos-game/pos-game.module').then(m => m.PosGameModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
