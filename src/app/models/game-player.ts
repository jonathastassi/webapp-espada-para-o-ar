import { Player } from './player';

export class GamePlayer {
    player: Player;
    points: number;
    wins: number;

    constructor(player: Player) {

        player.name = !player.name ? `Jogador ${player.id}` : player.name;

        this.player = player;
        this.points = 0;
        this.wins = 0;
    }
}
