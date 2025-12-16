const Card = require('../../Card.js');

class NerveBlast extends Card {
    // Play: Steal 1A. If you do, deal 2D to a creature.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.steal(),
            then: {
                target: {
                    cardType: 'creature',
                    gameAction: ability.actions.dealDamage({ amount: 2 })
                },
                message: '{0} 使用 {1} 造成了2点伤害对 {2}',
                messageArgs: (context) => {
                    return [context.player, context.source, context.target];
                }
            }
        });
    }
}

NerveBlast.id = 'nerve-blast';

module.exports = NerveBlast;
