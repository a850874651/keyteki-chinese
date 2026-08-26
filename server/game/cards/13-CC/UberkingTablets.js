const Card = require('../../Card.js');

class ÜberkingTablets extends Card {
    // Action: Ready or exhaust a creature. If you do, deal 2 damage to that creature.
    setupCardAbilities(ability) {
        this.action({
            targets: {
                action: {
                    mode: 'select',
                    choices: {
                        '重整生物': () => true,
                        '横置生物': () => true
                    }
                },
                creature: {
                    dependsOn: 'action',
                    cardType: 'creature',
                    gameAction: ability.actions.conditional((context) => ({
                        condition: context.selects?.action?.choice === '重整生物',
                        trueGameAction: ability.actions.ready({
                            target: context.targets?.creature
                        }),
                        falseGameAction: ability.actions.exhaust({
                            target: context.targets?.creature
                        })
                    }))
                }
            },
            effect: '{1} {2}',
            effectArgs: (context) => [
                context.selects.action.choice === '重整生物' ? '重整' : '横置',
                context.targets.creature
            ],
            then: (preThenContext) => ({
                always: true,
                gameAction: ability.actions.dealDamage({
                    amount: 2,
                    target: preThenContext.targets.creature
                }),
                message: '{0} 使用 {1} 造成2点伤害对 {3}',
                messageArgs: [preThenContext.targets.creature]
            })
        });
    }
}

ÜberkingTablets.id = 'überking-tablets';

module.exports = ÜberkingTablets;