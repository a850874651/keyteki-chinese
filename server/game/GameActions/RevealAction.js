const CardGameAction = require('./CardGameAction');

class RevealAction extends CardGameAction {
    setDefaultProperties() {
        this.chatMessage = false;
        this.location = ['hand'];
    }

    setup() {
        super.setup();
        this.name = 'reveal';
        this.effectMsg = '展示了 {0}';

        if (!Array.isArray(this.location)) {
            this.location = [this.location];
        }
    }

    canAffect(card, context) {
        return this.location.includes(card.location) && super.canAffect(card, context);
    }

    getEvent(card, context) {
        return super.createEvent('onRevealCards', { card, context }, () => {
            if (this.chatMessage) {
                context.game.addMessage('{0} 展示了 {1}', context.source, card);
            }
        });
    }
}

module.exports = RevealAction;
