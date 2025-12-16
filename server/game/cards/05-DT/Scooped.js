const Card = require('../../Card.js');

class Scooped extends Card {
    // Play: Deal 2D to a creature. If it is not destroyed, it captures 1A from its own side.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.dealDamage({ amount: 2 })
            },
            then: (preThenContext) => ({
                alwaysTriggers: true,
                condition: (context) =>
                    !(
                        context.preThenEvent.destroyEvent &&
                        context.preThenEvent.destroyEvent.resolved
                    ),
                message: '{0} 使用 {1} 抢占1琥珀从 {3} 放在 {4} 上',
                messageArgs: () => [preThenContext.target.controller, preThenContext.target],
                gameAction: ability.actions.capture(() => ({
                    target: preThenContext.target,
                    amount: 1,
                    player: preThenContext.target.controller
                }))
            })
        });
    }
}

Scooped.id = 'scooped';

module.exports = Scooped;
