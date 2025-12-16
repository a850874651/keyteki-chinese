const Card = require('../../Card.js');

class SkulkingSaboteurs extends Card {
    // After Reap: If your red key is forged, destroy an enemy
    // creature. If your yellow key is forged, destroy an enemy artifact. If
    // your blue key is forged, destroy an enemy upgrade.
    setupCardAbilities(ability) {
        this.reap({
            condition: (context) => context.player.opponent,
            effect:
                '如果其红色钥匙已锻造摧毁1个敌方生物, 如果其黄色钥匙已锻造摧毁1个敌方神器, 如果其蓝色钥匙已锻造摧毁1个敌方升级',
            gameAction: ability.actions.sequential([
                ability.actions.conditional((context) => ({
                    condition: context.player.opponent && context.player.keys.red,
                    trueGameAction: ability.actions.destroy({
                        promptForSelect: {
                            activePromptTitle: 'Choose a creature to destroy',
                            cardType: 'creature',
                            controller: 'opponent',
                            message: '{0} 使用 {1} 摧毁 {2}',
                            messageArgs: (card) => [context.player, context.source, card]
                        }
                    })
                })),
                ability.actions.conditional((context) => ({
                    condition: context.player.opponent && context.player.keys.yellow,
                    trueGameAction: ability.actions.destroy({
                        promptForSelect: {
                            activePromptTitle: 'Choose an artifact to destroy',
                            cardType: 'artifact',
                            controller: 'opponent',
                            message: '{0} 使用 {1} 摧毁 {2}',
                            messageArgs: (card) => [context.player, context.source, card]
                        }
                    })
                })),
                ability.actions.conditional((context) => ({
                    condition: context.player.opponent && context.player.keys.blue,
                    trueGameAction: ability.actions.destroy({
                        promptForSelect: {
                            activePromptTitle: 'Choose an upgrade to destroy',
                            cardType: 'upgrade',
                            controller: 'opponent',
                            message: '{0} 使用 {1} 摧毁 {2}',
                            messageArgs: (card) => [context.player, context.source, card]
                        }
                    })
                }))
            ])
        });
    }
}

SkulkingSaboteurs.id = 'skulking-saboteurs';

module.exports = SkulkingSaboteurs;
