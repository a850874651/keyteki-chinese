const _ = require('underscore');
const { EVENTS } = require('../Events/types');
const PlayerAction = require('./PlayerAction');

class RandomArchiveAction extends PlayerAction {
    setDefaultProperties() {
        this.amount = 1;
    }

    setup() {
        super.setup();
        this.name = 'archive';
        this.effectMsg =
            '随机归档了 ' + (this.amount === 1 ? '1张卡帕' : this.amount + ' 张卡牌') + '';
    }

    canAffect(player, context) {
        return this.amount === 0 ? false : super.canAffect(player, context);
    }

    getEvent(player, context) {
        return super.createEvent(EVENTS.unnamedEvent, { player, context }, () => {
            let amount = Math.min(this.amount, player.hand.length);
            let cards = _.shuffle(player.hand).slice(0, amount);
            context.game.actions.archive().resolve(cards, context);
        });
    }
}

module.exports = RandomArchiveAction;
