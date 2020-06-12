import { GamePlayer } from './../../models/game-player';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromGame from '../../reducers/game.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-pos-game',
  templateUrl: './pos-game.component.html',
  styleUrls: ['./pos-game.component.css']
})
export class PosGameComponent implements OnInit {

  storeGame$: Observable<fromGame.State>;

  displayedColumns: string[] = ['player', 'points', 'wins'];

  gamePlayers: GamePlayer[] = [];

  totalSteps: number;

  constructor(private router: Router, private store: Store<{ game: fromGame.State }>,) {
    this.storeGame$ = store.pipe(select(x => x.game));

    this.storeGame$.subscribe(data => {
      if (data?.game) {
        this.totalSteps = data.game.step - 1;

        this.gamePlayers = [...data.game.gamePlayers];

        this.gamePlayers = this.gamePlayers.sort((a, b) => {

          if (a.points > b.points) {
            return -1;
          }
          if (a.points < b.points) {
            return 1;
          }
          return 0;
        });

      }

      if (data.quantityPlayers === 0) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit(): void {
  }

}
