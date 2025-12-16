const Card = require('../../Card.js');

class ClonalWitch extends Card {
    // Elusive.
    // After Reap: Choose a house. Destroy each creature of the chosen house.
    // For each creature destroyed this way, gain 1 amber. Put Clonal Witch on top of its owner's deck.
    setupCardAbilities(ability) {
        this.reap({
            target: {
                mode: 'house'
            },
            effect: '摧毁每个 {1} 生物',
            effectArgs: (context) => [context.house],
            gameAction: ability.actions.destroy((context) => ({
                target: context.game.creaturesInPlay.filter((card) => card.hasHouse(context.house))
            })),
            then: {
                alwaysTriggers: true,
                message: '{0} 使用 {1} 获得 {3} 琥珀并将 {1} 放到其牌库顶',
                messageArgs: (context) => [
                    context.preThenEvents.filter((event) => !event.cancelled).length
                ],
                gameAction: [
                    ability.actions.gainAmber((context) => ({
                        amount: context.preThenEvents.filter((event) => !event.cancelled).length
                    })),
                    ability.actions.returnToDeck((context) => ({
                        target: context.source,
                        shuffle: false
                    }))
                ]
            }
        });
    }
}

ClonalWitch.id = 'clonal-witch';

module.exports = ClonalWitch;
