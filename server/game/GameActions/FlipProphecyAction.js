const PlayerAction = require('./PlayerAction');

class FlipProphecyAction extends PlayerAction {
    setDefaultProperties() {
        this.prophecyCard = null;
        this.cardFromHand = null;
    }

    setup() {
        super.setup();
        this.name = 'flipProphecy';
        this.effectMsg = '翻转 {1} 到 {2}';
        this.effectArgs = () => [
            this.prophecyCard,
            this.prophecyCard.controller.prophecyFlipSide(this.prophecyCard)
        ];
    }

    defaultTargets(context) {
        return context.player;
    }

    canAffect(player, context) {
        return (
            this.prophecyCard &&
            this.prophecyCard.isProphecy() &&
            this.prophecyCard.activeProphecy &&
            super.canAffect(player, context)
        );
    }

    getEvent(player, context) {
        return super.createEvent('onFlipProphecy', { player, context }, (event) => {
            event.player.flipProphecy(context, this.prophecyCard);
        });
    }
}

module.exports = FlipProphecyAction;
