const Card = require('../../Card.js');

class BreakOfDawn extends Card {
    // Play: Discard the top 3 cards of your deck. Put each Untamed card discarded this way into your hand.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.discard((context) => ({
                target: context.player.deck.slice(0, 3)
            })),
            then: {
                gameAction: ability.actions.returnToHand((context) => ({
                    location: 'discard',
                    target: context.preThenEvents
                        .filter((e) => !!e.card && e.card.hasHouse('untamed'))
                        .map((e) => e.card)
                })),
                message: '{0} 使用 {1} 将 {3} 返回手中',
                messageArgs: (context) => [
                    context.preThenEvents
                        .filter((e) => !!e.card && e.card.hasHouse('untamed'))
                        .map((e) => e.card)
                ]
            }
        });
    }
}

BreakOfDawn.id = 'break-of-dawn';

module.exports = BreakOfDawn;
