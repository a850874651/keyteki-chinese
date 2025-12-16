const { EVENTS } = require('../Events/types');
const CardGameAction = require('./CardGameAction');

class ReturnAmberAction extends CardGameAction {
    setDefaultProperties() {
        this.amount = 1;
        this.recipient = null;
        this.controllerRecipient = false;
        this.all = false;
    }

    setup() {
        this.name = 'removeAmber';
        this.targetType = ['creature'];
        this.effectMsg = `返还 ${this.all ? '所有' : this.amount} 琥珀从 {0} 到 ${
            this.recipient
                ? this.recipient.name + '的'
                : this.controllerRecipient
                ? '其控制者的'
                : '他的'
        } 琥珀池`;
    }

    canAffect(card, context) {
        if (card.location !== 'play area' || this.amount === 0) {
            return false;
        }

        return super.canAffect(card, context);
    }

    recipientForCard(card) {
        if (this.recipient) {
            return this.recipient;
        }
        if (this.controllerRecipient) {
            return card.controller;
        }
        return card.controller.opponent;
    }

    getEvent(card, context) {
        let params = {
            card: card,
            context: context,
            amount: this.all ? card.amber : Math.min(this.amount, card.amber),
            recipient: this.recipientForCard(card)
        };
        return super.createEvent(EVENTS.onReturnAmber, params, (event) => {
            event.card.removeToken('amber', event.amount);
            context.game.actions
                .gainAmber({
                    amount: event.amount,
                    target: this.recipientForCard(card)
                })
                .resolve(context.player, context);
        });
    }
}

module.exports = ReturnAmberAction;
