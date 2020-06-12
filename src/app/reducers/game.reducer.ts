import { Game } from './../models/game';
import { Player } from './../models/player';
import { createReducer, on } from '@ngrx/store';
import { BaseAction } from '../actions/base.action';
import * as fromGameAction from '../actions/game.action';
import { GamePlayer } from '../models/game-player';

export interface State {
    game: Game;
    quantityPlayers: number;
    players: Player[];
}

export const initialState: State = {
    game: null,
    quantityPlayers: 0,
    players: [],
};

const gameReducer = createReducer(
    initialState,
    on(fromGameAction.SetPlayers, (state, { players }) => {
        const playersData = players.map(player => {
            const p = { ...player };
            p.name = player.name === '' ? `Jogador ${player.id}` : player.name;
            return p;
        });
        localStorage.setItem('espada-app:players', JSON.stringify(playersData));
        return ({ ...state, quantityPlayers: players.length, players: playersData });
    }),
    on(fromGameAction.LoadPlayers, (state) => {
        let players: Player[] = JSON.parse(localStorage.getItem('espada-app:players'));

        if (!players) {
            players = new Array<Player>();
        }

        return ({ ...state, quantityPlayers: players.length, players });
    }),
    on(fromGameAction.StartGame, (state) => {

        const game: Game = new Game();
        game.step = 1;

        game.gamePlayers = [];
        state.players.map(player => {
            game.gamePlayers.push(new GamePlayer(Object.assign({}, player)));
        });

        return ({ ...state, game });
    }),
    on(fromGameAction.SetWinGamePlayer, (state, { player, points }) => {

        const game = { ...state.game };
        game.step = game.step + 1;

        game.gamePlayers = game.gamePlayers.map(
            gp => {
                if (gp.player.id === player.id) {

                    const gamePlayerWin = { ...gp };
                    gamePlayerWin.points += points;
                    gamePlayerWin.wins++;

                    return gamePlayerWin;
                }
                return gp;
            }
        );

        return ({ ...state, game });
    })
    // on(fromGameAction.ListGamePlayers, (state) => {

    //     state.game.gamePlayers.map(gplayer => {
    //         return gplayer.player;
    //     })

    //     return 
    // })
    // on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
    // on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
    // on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
    // on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
);

export function reducer(state: State | undefined, action: BaseAction) {
    return gameReducer(state, action);
}