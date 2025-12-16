const Card = require('../../Card.js');

class MackTheKnife extends Card {
    // Elusive.
    // You may use Mack the Knife as if it belonged to the active house.
    // Action: Deal 1D to a creature. If this damage destroys that creature, gain 1A.
    setupCardAbilities(ability) {
        this.persistentEffect({
            effect: ability.effects.canUse(
                (card, context, effectContext) => card === effectContext.source
            )
        });

        this.action({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.dealDamage()
            },
            then: {
                condition: (context) =>
                    context.preThenEvent.destroyEvent &&
                    context.preThenEvent.destroyEvent.destroyedByDamageDealt &&
                    context.preThenEvent.destroyEvent.resolved,
                message: '{0} 使用 {1} 获得1琥珀',
                gameAction: ability.actions.gainAmber()
            }
        });
    }
}

MackTheKnife.id = 'mack-the-knife';

module.exports = MackTheKnife;
