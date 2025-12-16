const Card = require('../../Card.js');

class XypTheImplanter extends Card {
    // After Reap: Take control of an enemy creature. Destroy a
    // friendly creature.
    setupCardAbilities(ability) {
        this.reap({
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.cardLastingEffect((context) => ({
                    duration: 'lastingEffect',
                    effect: ability.effects.takeControl(context.player)
                }))
            },
            effect: '获得 {1} 的控制权',
            effectArgs: (context) => [context.target ? context.target : 'nothing'],
            then: {
                alwaysTriggers: true,
                target: {
                    cardType: 'creature',
                    controller: 'self',
                    gameAction: ability.actions.destroy()
                },
                message: '{0} 使用 {1} 摧毁 {3}',
                messageArgs: (context) => [context.target]
            }
        });
    }
}

XypTheImplanter.id = 'xyp-the-implanter';

module.exports = XypTheImplanter;
