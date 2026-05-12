const Card = require('../../Card.js');

class Azuretooth extends Card {
    // After Fight/After Reap: Move each A from a friendly creature to
    // your pool. Give control of that creature to your opponent.
    setupCardAbilities(ability) {
        this.fight({
            reap: true,
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.returnAmber((context) => ({
                    all: true,
                    recipient: context.player
                }))
            },
            effect: '移动所有 {2} 琥珀从 {0} 到其琥珀池中并把 {0} 的控制权给 {1}',
            effectArgs: (context) => [context.player.opponent, context.target?.amber ?? 0],
            then: (preThenContext) => ({
                alwaysTriggers: true,
                condition: (context) => !!context.player.opponent,
                gameAction: ability.actions.cardLastingEffect((context) => ({
                    target: preThenContext.target,
                    duration: 'lastingEffect',
                    effect: ability.effects.takeControl(context.player.opponent)
                }))
            })
        });
    }
}

Azuretooth.id = 'azuretooth';

module.exports = Azuretooth;
