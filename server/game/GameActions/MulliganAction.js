const { EVENTS } = require('../Events/types');
const PlayerAction = require('./PlayerAction');

class MulliganAction extends PlayerAction {
    setup() {
        super.setup();
        this.name = 'mulligan';
        this.effectMsg = '调度了手牌';
    }

    defaultTargets(context) {
        return context.player;
    }

    getEvent(player, context) {
        return super.createEvent(
            EVENTS.unnamedEvent,
            { player: player, context: context },
            (event) => {
                context.game.addMessage('{0} 调度了手牌', this);
                event.player.takeMulligan();
            }
        );
    }
}

module.exports = MulliganAction;
