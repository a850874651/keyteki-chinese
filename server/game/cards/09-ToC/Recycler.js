const Card = require('../../Card.js');

class Recycler extends Card {
    // After Reap: Discard the top 3 cards of your deck. For each
    // creature discarded this way, make a token creature.
    setupCardAbilities(ability) {
        this.reap({
            gameAction: ability.actions.discard((context) => ({
                target: context.player.deck.slice(0, 3)
            })),
            then: {
                message: '{0} 使用 {1} 制造 {3} 个代标生物{4}',
                messageArgs: (context) => [
                    context.preThenEvents.filter(
                        (event) => !!event.card && event.card.type === 'creature'
                    ).length,
                    context.preThenEvents.filter(
                        (event) => !!event.card && event.card.type === 'creature'
                    ).length === 1
                        ? ''
                        : ''
                ],
                gameAction: ability.actions.makeTokenCreature((context) => ({
                    amount: context.preThenEvents.filter(
                        (event) => !!event.card && event.card.type === 'creature'
                    ).length
                }))
            }
        });
    }
}

Recycler.id = 'recycler';

module.exports = Recycler;
