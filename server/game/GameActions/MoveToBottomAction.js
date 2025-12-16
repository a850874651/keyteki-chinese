const CardGameAction = require('./CardGameAction');

class MoveToBottomAction extends CardGameAction {
    constructor(propertyFactory) {
        super(propertyFactory);
    }

    setDefaultProperties() {}

    setup() {
        super.setup();
        this.name = 'moveToBottom';
        this.effectMsg = '将1张卡牌放到牌库底';
    }

    getEvent(card, context) {
        return super.createEvent('unnamedEvent', { card: card, context: context }, () => {
            card.owner.deck = card.owner.deck.filter((c) => c !== card);
            card.owner.deck.push(card);
        });
    }
}

module.exports = MoveToBottomAction;
