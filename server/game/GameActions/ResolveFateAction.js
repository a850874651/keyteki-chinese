const CardGameAction = require('./CardGameAction');

class ResolveFateAction extends CardGameAction {
    setup() {
        this.name = 'fate';
        this.targetType = ['creature', 'artifact', 'action', 'upgrade'];
        this.effectMsg = '结算了 {0}的命运效果';
    }

    getEvent(card, context) {
        let fateEvent = super.createEvent('onFate', { card: card, context: context }, () => {
            context.game.addMessage('{0} 结算了 {1}的命运效果', context.player, card);
        });

        fateEvent.addChildEvent(
            context.game.actions
                .moveCard({ card: card, destination: 'discard' })
                .getEvent(card, context)
        );

        return fateEvent;
    }
}

module.exports = ResolveFateAction;
