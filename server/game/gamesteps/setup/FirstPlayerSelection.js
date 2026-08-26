const _ = require('underscore');
const AllPlayerPrompt = require('../allplayerprompt');

class FirstPlayerSelection extends AllPlayerPrompt {
    constructor(game) {
        super(game);
        this.previousWinner = game.previousWinner;
        this.clickedButton = false;
        this.players = game.getPlayers();
    }

    completionCondition(player) {
        return (
            this.previousWinner === player.name ||
            !this.previousWinner ||
            this.clickedButton ||
            this.game.adaptiveFirstDeck
        );
    }

    activePrompt() {
        return {
            promptTitle: 'First Player',
            menuTitle: 'Who will go first?',
            buttons: this.players
                .map((player) => ({ arg: player.name, text: player.name }))
                .concat({ arg: 'random', text: 'random' })
        };
    }

    waitingPrompt() {
        return { menuTitle: 'Waiting for opponent to choose to continue who will go first' };
    }

    menuCommand(player, arg) {
        const otherPlayer = this.game.getOtherPlayer(player);
        let message;

        if (!otherPlayer) {
            this.game.activePlayer = player;
            message = '{0} 先手';
        } else if (arg === player.name) {
            this.game.activePlayer = player;
            message = '{0} 选择了先手';
        } else if (arg === otherPlayer.name) {
            this.game.activePlayer = otherPlayer;
            message = '{0} 选择了后手';
        } else {
            message = '{0} 选择了随机先后手';
        }

        this.game.addMessage(message, player.name);

        this.clickedButton = true;

        return true;
    }

    onCompleted() {
        if (this.game.adaptiveFirstDeck) {
            this.players.forEach((player) => {
                if (player.deckData === this.game.adaptiveFirstDeck) {
                    this.game.activePlayer = player;
                    this.game.addMessage('{0} becomes the first player!', player);
                }
            });
        }

        if (!this.game.activePlayer) {
            let allPlayersShuffled = _.shuffle(this.game.getPlayers());
            this.game.activePlayer = allPlayersShuffled.shift();
            this.game.addMessage('{0} 赢得了猜先，成为先手', this.game.activePlayer);
        }

        this.game.firstPlayer = this.game.activePlayer;
    }
}

module.exports = FirstPlayerSelection;
