const Card = require('../../Card.js');

class PainReaction extends Card {
    // Play: Deal 2D to an enemy creature. If this damage destroys that creature, deal 2D to each of that creatures neighbors.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.dealDamage({ amount: 2 })
            },
            then: {
                condition: (context) =>
                    context.preThenEvent.destroyEvent &&
                    context.preThenEvent.destroyEvent.destroyedByDamageDealt &&
                    context.preThenEvent.destroyEvent.resolved,
                gameAction: ability.actions.dealDamage((context) => ({
                    amount: 2,
                    target: context.preThenEvent.clone.neighbors
                })),
                message: '{0} 使用 {1} 造成了额外2点伤害对 {3}',
                messageArgs: (context) => [context.preThenEvent.clone.neighbors]
            }
        });
    }
}

PainReaction.id = 'pain-reaction';

module.exports = PainReaction;
