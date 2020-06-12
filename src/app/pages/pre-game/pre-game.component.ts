import { initialState } from './../../reducers/game.reducer';
import { SetPlayers, LoadPlayers } from './../../actions/game.action';
import { Player } from './../../models/player';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import * as fromGame from '../../reducers/game.reducer';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pre-game',
  templateUrl: './pre-game.component.html',
  styleUrls: ['./pre-game.component.css']
})
export class PreGameComponent implements OnInit {

  @ViewChild('modalLoading', { static: true }) modalLoading;

  storeGame$: Observable<fromGame.State>;

  quantityPlayers: number = 0;
  quantitySelected: number = 0;
  players: Player[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store<{ game: fromGame.State }>,
    private _snackBar: MatSnackBar
  ) {
    this.storeGame$ = store.pipe(select(x => x.game));
    this.store.dispatch(LoadPlayers());
  }

  // openDialog() {
  //   this.dialog.open(this.modal, {
  //     disableClose: true
  //   });
  // }

  ngOnInit(): void {

  }

  changeQuantity(quantity: MatSelectChange) {

    if (this.quantityPlayers < quantity.value) {
      const total = this.players.length;
      for (let j = total; j < quantity.value; j++) {
        this.players.push(new Player(j + 1, ''));
      }
    }
    else {
      this.players.splice(quantity.value, this.players.length);
    }

    this.setQuantity(quantity.value);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['msg-error']
    });
  }

  startGame() {
    if (this.quantitySelected === 0) {
      this.openSnackBar('Selecione pelo menos 1 jogador');
      return;
    }

    this.dialog.open(this.modalLoading, {
      disableClose: true
    });
    this.store.dispatch(SetPlayers({ players: this.players }));
    this.router.navigateByUrl('/game');
  }

  setPlayers() {
    this.storeGame$.subscribe(players => {
      this.players = [];
      players.players.map(player => {
        this.players.push(new Player(player.id, player.name));
      });
      this.setQuantity(this.players.length);
    });
  }

  private setQuantity(value) {
    this.quantityPlayers = this.players.length;
    this.quantitySelected = this.quantityPlayers;
  }

}
