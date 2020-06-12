import { Player } from './../models/player';
import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
    SetPlayers = 'SET_PLAYERS',
    LoadPlayers = 'LOAD_PLAYERS',
    StartGame = 'START_GAME',
    SetWinGamePlayer = 'SET_WIN_GAME_PLAYER',
}

export const SetPlayers = createAction(
    ActionTypes.SetPlayers,
    props<{ players: Player[] }>()
);

export const LoadPlayers = createAction(
    ActionTypes.LoadPlayers
);

export const StartGame = createAction(
    ActionTypes.StartGame
);

export const SetWinGamePlayer = createAction(
    ActionTypes.SetWinGamePlayer,
    props<{ player: Player, points: number }>()
);
