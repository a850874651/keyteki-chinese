const Card = require('../../Card.js');

class CatenaFiend extends Card {
    // After Fight: Steal 1A. Deal 3D to a friendly creature.
    setupCardAbilities(ability) {
        this.fight({
            gameAction: ability.actions.steal(),
            then: {
                alwaysTriggers: true,
                target: {
                    cardType: 'creature',
                    controller: 'self',
                    gameAction: ability.actions.dealDamage({ amount: 3 })
                },
                message: '{0} 使用 {1} 造成3点伤害对 {3}',
                messageArgs: (context) => [context.target]
            }
        });
    }
}

CatenaFiend.id = 'catena-fiend';

module.exports = CatenaFiend;
