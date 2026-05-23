const Card = require('../../Card.js');

class Placeholder extends Card {
    // Move a creature to a flank of its controller窶冱 battleline and
    // deal 2D to it. If it is not destroyed, repeat the preceding effect.
    setupCardAbilities(ability) {
        this.play({
            effect: '移动 {1} 到侧翼并对其造成2点伤害',
            effectArgs: (context) => context.target,
            target: {
                cardType: 'creature',
                gameAction: ability.actions.sequential([
                    ability.actions.moveToFlank(),
                    ability.actions.dealDamage({
                        amount: 2
                    })
                ])
            },
            then: (preThenContext) => ({
                alwaysTriggers: true,
                condition: () =>
                    preThenContext.target && preThenContext.target.location === 'play area',
                message: '{0} 使用 {1} 移动 {3} 到侧翼并对其造成2点伤害',
                messageArgs: (context) => context.target,
                target: {
                    cardType: 'creature',
                    gameAction: ability.actions.sequential([
                        ability.actions.moveToFlank(),
                        ability.actions.dealDamage({
                            amount: 2
                        })
                    ])
                }
            })
        });
    }
}

Placeholder.id = 'placeholder';

module.exports = Placeholder;
