const Card = require('../../Card.js');

class TransmutingLift extends Card {
    // This creature gains, “After Reap: You may move this creature
    // anywhere in its controller’s battleline.”
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.gainAbility('reap', {
                gameAction: ability.actions.moveOnBattleline((context) => ({
                    target: context.source,
                    player: context.source.controller
                })),
                effect: '移动 {1} 到其战线的任意位置',
                effectArgs: (context) => [context.source]
            })
        });
    }
}

TransmutingLift.id = 'transmuting-lift';

module.exports = TransmutingLift;
