const Card = require('../../Card.js');

class RedSkies extends Card {
    // Play: Move a friendly Skyborn creature to a flank and ready
    // it. If a red key is forged, repeat the preceding effect.
    setupCardAbilities(ability) {
        this.play({
            target: {
                controller: 'self',
                cardType: 'creature',
                cardCondition: (card) => card.hasHouse('skyborn'),
                gameAction: ability.actions.sequential([
                    ability.actions.moveToFlank(),
                    ability.actions.ready()
                ])
            },
            effect: '移动 {1} 到侧翼并重整它',
            effectArgs: (context) => [context.target],
            then: {
                condition: (context) => context.game.isKeyForged('red'),
                alwaysTriggers: true,
                target: {
                    controller: 'self',
                    cardType: 'creature',
                    cardCondition: (card) => card.hasHouse('skyborn'),
                    gameAction: ability.actions.sequential([
                        ability.actions.moveToFlank(),
                        ability.actions.ready()
                    ])
                },
                message:
                    '{0} 使用 {1} 重复之前的效果将 {3} 移至侧翼并重整它',
                messageArgs: (context) => [context.target]
            }
        });
    }
}

RedSkies.id = 'red-skies';

module.exports = RedSkies;
