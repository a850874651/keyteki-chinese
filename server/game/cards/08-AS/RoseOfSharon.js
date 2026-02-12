const Card = require('../../Card.js');

class RoseOfSharon extends Card {
    // Action: Choose one of Rose of Sharon窶冱 neighbors. Deal damage
    // to an enemy creature equal to that neighbor窶冱 power. If your
    // red key is forged, repeat the preceding effect.
    setupCardAbilities(ability) {
        this.action({
            targets: {
                neighbor: {
                    controller: 'self',
                    cardType: 'creature',
                    cardCondition: (card, context) => context.source.neighbors.includes(card)
                },
                enemy: {
                    dependsOn: 'neighbor',
                    cardType: 'creature',
                    controller: 'opponent',
                    gameAction: ability.actions.dealDamage((context) => ({
                        amount: context.targets.neighbor ? context.targets.neighbor.power : 0
                    }))
                }
            },
            then: {
                condition: (context) => context.player.keys.red,
                alwaysTriggers: true,
                targets: {
                    neighbor2: {
                        controller: 'self',
                        cardType: 'creature',
                        cardCondition: (card, context) => context.source.neighbors.includes(card)
                    },
                    enemy2: {
                        dependsOn: 'neighbor2',
                        cardType: 'creature',
                        controller: 'opponent',
                        gameAction: ability.actions.dealDamage((context) => ({
                            amount: context.targets.neighbor2 ? context.targets.neighbor2.power : 0
                        }))
                    }
                },
                message: '{0} 使用 {1} 重复之前的效果造成 {3} 点伤害对 {4}',
                messageArgs: (context) => [
                    context.targets.neighbor2 ? context.targets.neighbor2.power : 0,
                    context.targets.enemy2
                ]
            }
        });
    }
}

RoseOfSharon.id = 'rose-of-sharon';

module.exports = RoseOfSharon;
