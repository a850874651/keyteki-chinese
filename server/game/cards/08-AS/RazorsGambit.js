const Card = require('../../Card.js');

class RazorsGambit extends Card {
    // Action: Ready and fight with a friendly Skyborn creature. If
    // your blue key is forged, repeat the preceding effect.
    setupCardAbilities(ability) {
        this.action({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card) => card.hasHouse('skyborn'),
                gameAction: ability.actions.sequential([
                    ability.actions.ready(),
                    ability.actions.fight()
                ])
            },
            effect: '重整并使 {0} 战斗',
            then: {
                condition: (context) => context.player.keys.blue,
                alwaysTriggers: true,
                target: {
                    cardType: 'creature',
                    controller: 'self',
                    cardCondition: (card) => card.hasHouse('skyborn'),
                    gameAction: ability.actions.sequential([
                        ability.actions.ready(),
                        ability.actions.fight()
                    ])
                },
                message: '{0} 使用 {1} 重复之前的效果重整并使 {3} 战斗',
                messageArgs: (context) => [context.target]
            }
        });
    }
}

RazorsGambit.id = 'razor-s-gambit';

module.exports = RazorsGambit;
