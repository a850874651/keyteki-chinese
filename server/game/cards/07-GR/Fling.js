const Card = require('../../Card.js');

class Fling extends Card {
    // Play: Destroy a friendly creature. If you do, deal damage to an
    // enemy creature equal to the destroyed creature窶冱 power with 3
    // splash.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.destroy()
            },
            then: {
                target: {
                    cardType: 'creature',
                    controller: 'opponent',
                    gameAction: ability.actions.dealDamage((context) => ({
                        amount: context.preThenEvents[0].clone.modifiedPower,
                        splash: 3
                    }))
                },
                message: '{0} 使用 {1} 造成 {3} 点伤害对 {4} 并溅射3',
                messageArgs: (context) => [
                    context.preThenEvents[0].clone.modifiedPower,
                    context.target
                ]
            }
        });
    }
}

Fling.id = 'fling';

module.exports = Fling;
