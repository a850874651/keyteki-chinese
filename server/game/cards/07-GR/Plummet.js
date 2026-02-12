const Card = require('../../Card.js');

class Plummet extends Card {
    // Play: Discard your hand. Deal 1 to each creature for each card
    // discarded this way.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.discardEntireLocation((context) => ({
                location: 'hand',
                target: context.player
            })),
            then: {
                gameAction: ability.actions.dealDamage((context) => ({
                    amount: context.preThenCards.length,
                    target: context.game.creaturesInPlay
                })),
                message: '{0} 使用 {1} 造成 {3} 点伤害对每个生物',
                messageArgs: (context) => [context.preThenCards.length]
            }
        });
    }
}

Plummet.id = 'plummet';

module.exports = Plummet;
