const Card = require('../../Card.js');

class FlyingBroomstick extends Card {
    // This creature gains elusive, and "After Reap: Heal all damage
    // and move all amber and counters from a creature to the common
    // supply."
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: [
                ability.effects.addKeyword({ elusive: 1 }),
                ability.effects.gainAbility('reap', {
                    target: {
                        cardType: 'creature',
                        gameAction: [
                            ability.actions.heal({ fully: true }),
                            ability.actions.removeAmber({ all: true }),
                            ability.actions.removeAllTokens()
                        ]
                    },
                    effect: '治疗并移除 {1} 上的所有的琥珀以及指示物',
                    effectArgs: (context) => [context.target]
                })
            ]
        });
    }
}

FlyingBroomstick.id = 'flying-broomstick';

module.exports = FlyingBroomstick;
