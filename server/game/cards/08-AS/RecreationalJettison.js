const Card = require('../../Card.js');

class RecreationalJettison extends Card {
    // Play: Discard a card. Resolve its bonus icons as if you had
    // played it. If a yellow key is forged, repeat the preceding
    // effect.
    setupCardAbilities(ability) {
        this.play({
            target: {
                controller: 'self',
                location: 'hand',
                gameAction: ability.actions.sequential([
                    ability.actions.discard(),
                    ability.actions.resolveBonusIcons()
                ])
            },
            effect: '从其手中弃掉 {1} 并结算其奖励图标',
            effectArgs: (context) => [context.target],
            then: {
                condition: (context) => context.game.isKeyForged('yellow'),
                alwaysTriggers: true,
                target: {
                    controller: 'self',
                    location: 'hand',
                    gameAction: ability.actions.sequential([
                        ability.actions.discard(),
                        ability.actions.resolveBonusIcons()
                    ])
                },
                message:
                    '{0} 使用 {1} 重复之前的效果弃掉 {3} 并结算其奖励图标',
                messageArgs: (context) => [context.target]
            }
        });
    }
}

RecreationalJettison.id = 'recreational-jettison';

module.exports = RecreationalJettison;
