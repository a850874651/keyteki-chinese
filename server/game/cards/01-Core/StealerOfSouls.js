const Card = require('../../Card.js');

class StealerOfSouls extends Card {
    // After an enemy creature is destroyed fighting Stealer of Souls, purge that creature and gain 1<A>.
    setupCardAbilities(ability) {
        this.reaction({
            message: '{0} 使用 {1} 清除 {2} 并获得1琥珀',
            messageArgs: (context) => {
                return [context.player, context.source, context.target];
            },
            when: {
                onCardDestroyed: (event, context) =>
                    event.destroyedFighting && event.damageEvent.damageSource === context.source
            },
            gameAction: [
                ability.actions.purge((context) => ({
                    target: context.event.card.location === 'discard' ? context.event.card : []
                })),
                ability.actions.gainAmber()
            ]
        });
    }
}

StealerOfSouls.id = 'stealer-of-souls';

module.exports = StealerOfSouls;
