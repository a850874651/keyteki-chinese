const Card = require('../../Card.js');

class SwapWidget extends Card {
    // Action: Return a ready friendly Mars creature to your hand. If you do, put a Mars creature with a different name from your hand into play, then ready it.
    setupCardAbilities(ability) {
        this.action({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card) => card.hasHouse('mars') && !card.exhausted,
                gameAction: ability.actions.returnToHand()
            },
            then: (preThenContext) => ({
                condition: () => !!preThenContext.target,
                target: {
                    cardType: 'creature',
                    controller: 'self',
                    location: 'hand',
                    cardCondition: (card) =>
                        card.hasHouse('mars') &&
                        preThenContext.target &&
                        card.name !== preThenContext.target.name,
                    gameAction: ability.actions.putIntoPlay()
                },
                message: '{0} 将 {2} 放置入场，通过 {1}, 并重整了它',
                then: (context) => ({
                    gameAction: ability.actions.ready({ target: context.target })
                })
            })
        });
    }
}

SwapWidget.id = 'swap-widget';

module.exports = SwapWidget;
