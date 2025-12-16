const Card = require('../../Card.js');

class CirrusMace extends Card {
    // Action: Give a creature two +1 power counters. Deal 2D to each
    // of that creature窶冱 neighbors.
    setupCardAbilities(ability) {
        this.action({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.addPowerCounter((context) => ({
                    amount: 2,
                    target: context.target
                }))
            },
            then: (preThenContext) => ({
                gameAction: ability.actions.dealDamage({
                    amount: 2,
                    target: preThenContext.target ? preThenContext.target.neighbors : []
                }),
                message: "{0} 使用 {1} 造成2点伤害对 {3} 的相邻生物",
                messageArgs: [preThenContext.target]
            })
        });
    }
}

CirrusMace.id = 'cirrus-mace';

module.exports = CirrusMace;
