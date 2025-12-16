const Card = require('../../Card.js');

class SwiftInduction extends Card {
    // Play: Make a token creature. If that token creature enters play
    // adjacent to a Mutant creature, archive Swift Induction.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.makeTokenCreature(),
            then: {
                condition: (context) =>
                    context.preThenEvent.card.neighbors.some((c) => c.hasTrait('mutant')),
                gameAction: ability.actions.archive((context) => ({
                    effect: '归档 {1}',
                    target: context.source
                })),
                message: '{0} 使用 {1} 归档 {3}',
                messageArgs: (context) => [context.source]
            }
        });
    }
}

SwiftInduction.id = 'swift-induction';

module.exports = SwiftInduction;
