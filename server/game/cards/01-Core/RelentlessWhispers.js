const Card = require('../../Card.js');

class RelentlessWhispers extends Card {
    // Play: Deal 2<D> to a creature. If this damage destroys that creature, steal 1<A>.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.dealDamage({ amount: 2 })
            },
            then: {
                condition: (context) =>
                    context.preThenEvent.destroyEvent &&
                    context.preThenEvent.destroyEvent.destroyedByDamageDealt &&
                    context.preThenEvent.destroyEvent.resolved,
                gameAction: ability.actions.steal(),
                message: '{0} 使用 {1} 窃取了1琥珀从 {3}',
                messageArgs: (context) => [context.player.opponent]
            }
        });
    }
}

RelentlessWhispers.id = 'relentless-whispers';

module.exports = RelentlessWhispers;
