const AgreementPrompt = require('./AgreementPrompt');

const RematchModes = {
    same: { description: 'with the same decks' },
    swap: { description: 'with swapped decks' },
    change: { description: 'with different decks' }
};

class RematchPrompt extends AgreementPrompt {
    /**
     * @param {string} mode 'same' (default), 'swap' (same decks, but swap
     * sides), or 'change' (each player picks a different deck).
     * @param {{onAccept?: () => void, onCancel?: () => void}} [callbacks]
     */
    constructor(game, requestingPlayer, mode = 'same', callbacks = {}) {
        super(game, requestingPlayer, callbacks);

        if (!RematchModes[mode]) {
            mode = 'same';
        }
        this.mode = mode;
    }

    getWaitingTitle() {
        return '等待对手接受再次对局';
    }

    getRequestMenuTitle() {
        return {
            text: '{{player}} 希望再次对局 {{description}}. 接受吗?',
            values: {
                player: this.requestingPlayer.name,
                description: RematchModes[this.mode].description
            }
        };
    }

    addCancelAlert(player) {
        this.game.addAlert('info', '{0} 取消再次对局申请', player);
    }

    addAcceptAlert(player) {
        this.game.addAlert(
            'info',
            '{0} 同意重新对局 {1}',
            player,
            RematchModes[this.mode].description
        );
    }

    addDeclineAlert(player) {
        this.game.addAlert('info', '{0}拒绝再次对局', player);
    }

    onCompleted() {
        if (this.cancelled) {
            return;
        }

        this.game.rematch(this.mode);
        this.game.addAlert(
            'danger',
            '{0} 重置了游戏并开启再次对局 {1}',
            this.requestingPlayer,
            RematchModes[this.mode].description
        );
    }
}

module.exports = RematchPrompt;
