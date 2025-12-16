const AllPlayerPrompt = require('./allplayerprompt');

class RematchWithNewDecksPrompt extends AllPlayerPrompt {
    constructor(game, requestingPlayer) {
        super(game);

        this.requestingPlayer = requestingPlayer;
        this.completedPlayers = new Set([requestingPlayer]);
        this.cancelled = false;
    }

    completionCondition(player) {
        return this.cancelled || this.completedPlayers.has(player);
    }

    activePrompt() {
        return {
            menuTitle: {
                text: '{{player}} would like a rematch with new decks. Allow?',
                values: {
                    player: this.requestingPlayer.name
                }
            },
            buttons: [
                { arg: 'yes', text: 'Yes' },
                { arg: 'no', text: 'No' }
            ]
        };
    }

    waitingPrompt() {
        return {
            menuTitle: 'Waiting for opponent to agree to rematch'
        };
    }

    onMenuCommand(player, arg) {
        if (arg === 'yes') {
            this.game.addAlert(
                'info',
                '{0} 同意 {1} 用新卡组再次对局，正在准备'
            );
            this.completedPlayers.add(player);
        } else {
            this.game.addAlert('info', '{0} 不同意用新卡组再次对局', player);
            this.cancelled = true;
        }

        return true;
    }

    onCompleted() {
        if (this.cancelled) {
            return;
        }

        this.game.rematchWithNewDecks();
        this.game.addAlert(
            'danger',
            '{0} 以 /rematch-with-new-decks 重置了游戏并开启再次对局',
            this.requestingPlayer
        );
    }
}

module.exports = RematchWithNewDecksPrompt;
