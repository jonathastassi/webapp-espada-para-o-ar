import { GamePlayer } from './../../models/game-player';
import { ChronometerComponent } from './../../components/chronometer/chronometer.component';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { StartGame, SetWinGamePlayer } from './../../actions/game.action';
import { BiblicalReference } from './../../models/biblical-reference';
import { BibleService } from './../../services/bible.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select, props } from '@ngrx/store';
import * as fromGame from '../../reducers/game.reducer';
import { GameScreen } from 'src/app/models/game-screen';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Time } from 'src/app/models/time';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild('modalWinner', { static: true }) modalWinner: any;
  @ViewChild('modalRestart', { static: true }) modalRestart: any;

  @ViewChild('timer', { static: false }) timer: ChronometerComponent;
  @ViewChild('panelVerifyReference', { static: false }) panelVerifyReference: any;

  biblicalReference: BiblicalReference = null;
  gameScreen: GameScreen;

  storeGame$: Observable<fromGame.State>;

  points: number;

  selectedPlayerWinner: boolean = false;

  constructor(
    private bibleService: BibleService,
    private router: Router,
    private store: Store<{ game: fromGame.State }>,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) {
    this.storeGame$ = store.pipe(select(x => x.game));

    this.storeGame$.subscribe(data => {
      if (data.quantityPlayers === 0) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit(): void {
    this.dialog.closeAll();
    this.store.dispatch(StartGame());
    this.startGame();
  }

  startGame() {
    this.points = 0;

    this.gameScreen = new GameScreen();
    this.biblicalReference = this.bibleService.getRandomBiblicalReference();

    setTimeout(() => {
      this.gameScreen.showFirstTitle = true;

      setTimeout(() => {
        this.gameScreen.showVerse = true;

        setTimeout(() => {
          this.gameScreen.showChapter = true;

          setTimeout(() => {
            this.gameScreen.showBook = true;

            setTimeout(() => {
              this.gameScreen.showPrepare = true;

              setTimeout(() => {
                this.gameScreen.showGo = true;

                setTimeout(() => {
                  this.timer.reset();
                  this.timer.start();
                }, 300);

              }, 2000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 800);
  }

  verifyReference() {
    this.timer.pause();
    this._bottomSheet.open(this.panelVerifyReference, {
      disableClose: true,
    });
  }

  calculatePoints() {
    const timer: Time = this.timer.getTime();
    const seconds = ((timer.minute) * 60 * 60 + (timer.second) * 60 + (+timer.millesimal)) / 60;

    if (seconds >= 0 && seconds < 3) {
      return 1000;
    }
    if (seconds >= 3 && seconds < 5) {
      return 900;
    }
    if (seconds >= 5 && seconds < 8) {
      return 800;
    }
    if (seconds >= 8 && seconds < 11) {
      return 700;
    }
    if (seconds >= 11 && seconds < 15) {
      return 500;
    }
    return 150;
  }

  openDialogSetWin() {
    this.selectedPlayerWinner = false;
    this._bottomSheet.dismiss();

    this.points = this.calculatePoints();

    this.dialog.open(this.modalWinner, {
      width: '650px',
    });
  }

  openModalRestart() {
    this._bottomSheet.dismiss();

    this.dialog.open(this.modalRestart, {
      width: '650px',
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(this.modalWinner, {
      width: '250px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  selectWinner(gamePlayer: GamePlayer) {
    this.store.dispatch(SetWinGamePlayer({ player: gamePlayer.player, points: this.points }));
    this.selectedPlayerWinner = true;
  }

  finalizeGame() {
    this.dialog.closeAll();
    this.router.navigateByUrl('/pos-game');
  }
}
