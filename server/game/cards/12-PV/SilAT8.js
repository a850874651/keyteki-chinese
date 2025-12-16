const Card = require('../../Card.js');

class SilAT8 extends Card {
    // Enhance .
    // After Fight/After Reap: You may ready a non-Robot creature for each of Sil-A-T8's Star Alliance neighbors.
    setupCardAbilities(ability) {
        this.fight({
            reap: true,
            effect: '重整 {1} 个非机器人生物{2}',
            effectArgs: (context) => {
                const count = context.source.neighbors.filter((card) =>
                    card.hasHouse('staralliance')
                ).length;
                return [count, count === 1 ? '' : ''];
            },
            gameAction: ability.actions.sequentialForEach((context) => ({
                num: context.source.neighbors.filter((card) => card.hasHouse('staralliance'))
                    .length,
                action: ability.actions.ready({
                    promptForSelect: {
                        cardType: 'creature',
                        cardCondition: (card) => !card.hasTrait('robot'),
                        message: '{0} 使用 {1} 重整 {2}',
                        messageArgs: (card) => [context.player, context.source, card]
                    }
                })
            }))
        });
    }
}

SilAT8.id = 'sil-a-t8';

module.exports = SilAT8;
