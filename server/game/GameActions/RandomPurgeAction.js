const _ = require('underscore');
const { EVENTS } = require('../Events/types');
const PlayerAction = require('./PlayerAction');

class RandomPurgeAction extends PlayerAction {
    setDefaultProperties() {
        this.amount = 1;
        // hand or archives
        this.location = 'hand';
    }

    setup() {
        super.setup();
        this.name = 'purge';
        this.effectMsg =
            '随机清除了 ' +
            (this.amount === 1 ? '1张卡牌' : `${this.amount} 张卡牌`) +
            ` 从 {0}的 ${this.location}`;
    }

    canAffect(player, context) {
        return this.amount === 0 ? false : super.canAffect(player, context);
    }

    getEvent(player, context) {
        return super.createEvent(EVENTS.unnamedEvent, { player, context }, () => {
            let amount = Math.min(this.amount, player.hand.length);
            let cards = _.shuffle(player.hand).slice(0, amount);
            if (this.location === 'archives') {
                amount = Math.min(this.amount, player.archives.length);
                cards = _.shuffle(player.archives).slice(0, amount);
            }

            if (cards.length > 0) {
                context.game.addMessage('{0} 随机清除了 {1}', player, cards);
                context.game.actions.purge().resolve(cards, context);
            } else {
                context.game.addMessage('{0} 未清除卡牌', player);
            }
        });
    }
}

module.exports = RandomPurgeAction;
