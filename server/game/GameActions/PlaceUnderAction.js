const { EVENTS } = require('../Events/types');
const CardGameAction = require('./CardGameAction');

class PlaceUnderAction extends CardGameAction {
    constructor(propertyFactory, isGraft = false) {
        super(propertyFactory);
        this.isGraft = isGraft;
    }

    setDefaultProperties() {
        this.facedown = false;
        this.parent = null;
    }

    setup() {
        super.setup();
        this.name = this.isGraft ? 'graft' : 'placeUnder';
        this.effectArgs = this.parent;
        if (this.isGraft) {
            this.effectMsg = '嫁接 {0} 到 {1} 上';
        } else {
            this.effectMsg = '放 ' + (this.facedown ? '1张卡牌' : '{0}') + ' 到 {1} 下方';
        }
    }

    canAffect(card, context) {
        return this.parent && super.canAffect(card, context);
    }

    placeUnder(card) {
        let controller = card.controller;
        let oldTopOfDeck = controller.deck[0];
        card.controller.removeCardFromPile(card);
        if (card.location === 'play area') {
            card.clearDependentCards();
            card.onLeavesPlay();
        }

        // Split the composed halves of a gigantic creature
        if (card.gigantic && card.composedPart) {
            this.placeUnder(card.composedPart);
            card.composedPart = null;
            card.image = card.id;
        }

        card.controller = this.parent.controller;
        card.parent = this.parent;
        card.moveTo(this.isGraft ? 'grafted' : 'under');
        card.facedown = this.facedown;
        this.parent.childCards.push(card);
        controller.checkDeckAfterCardMove(oldTopOfDeck);
    }

    getEvent(card, context) {
        return super.createEvent(
            this.isGraft ? EVENTS.onCardGrafted : EVENTS.onPlaceUnder,
            { card, context },
            () => {
                if (card.location === 'play area') {
                    context.game.raiseEvent(EVENTS.onCardLeavesPlay, { card, context }, () =>
                        this.placeUnder(card)
                    );
                } else {
                    this.placeUnder(card);
                }
            }
        );
    }
}

module.exports = PlaceUnderAction;
