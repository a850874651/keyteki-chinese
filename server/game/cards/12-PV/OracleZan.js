const Card = require('../../Card.js');

class OracleZan extends Card {
    // After Reap: Move each amber from a friendly creature to the common supply. For each amber moved, heal 2 damage from a creature.
    setupCardAbilities(ability) {
        this.reap({
            effect: '移动 {1} 上的琥珀到公共供应堆并治疗伤害',
            effectArgs: (context) => [context.target],
            target: {
                controller: 'self',
                cardType: 'creature',
                gameAction: ability.actions.removeAmber({
                    all: true
                })
            },
            then: {
                gameAction: ability.actions.sequentialForEach((context) => ({
                    num: context.preThenEvent.amount,
                    action: ability.actions.heal((context) => ({
                        amount: 2,
                        promptForSelect: {
                            activePromptTitle: 'Choose a creature to heal',
                            cardType: 'creature',
                            controller: 'any',
                            message: '{0} 使用 {1} 治疗 {2} 2点伤害',
                            messageArgs: (cards) => [context.player, context.source, cards]
                        }
                    }))
                }))
            }
        });
    }
}

OracleZan.id = 'oracle-zan';

module.exports = OracleZan;
