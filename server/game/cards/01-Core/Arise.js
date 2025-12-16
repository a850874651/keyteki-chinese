const Card = require('../../Card.js');

class Arise extends Card {
    // Play: Choose a house. Return each creature of that house from your discard pile to your hand. Gain 1 chain.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'house'
            },
            effect: '•Ô‰ñ {1} “ž‘´Žè”v',
            effectArgs: (context) => [
                context.player.discard.filter(
                    (card) => card.type === 'creature' && card.hasHouse(context.house)
                )
            ],
            gameAction: [
                ability.actions.returnToHand((context) => ({
                    location: 'discard',
                    target: context.player.discard.filter(
                        (card) => card.type === 'creature' && card.hasHouse(context.house)
                    )
                })),
                ability.actions.gainChains()
            ]
        });
    }
}

Arise.id = 'arise';

module.exports = Arise;
