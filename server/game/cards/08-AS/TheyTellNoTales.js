const Card = require('../../Card.js');

class TheyTellNoTales extends Card {
    // Play: Choose a house. Destroy each creature of the chosen
    // house. Gain 2 chains.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'house'
            },
            effect: '摧毁所有 {1} 势力的生物并获得2枷锁',
            effectArgs: (context) => [context.house],
            gameAction: [
                ability.actions.destroy((context) => ({
                    target: context.game.creaturesInPlay.filter((card) =>
                        card.hasHouse(context.house)
                    )
                })),
                ability.actions.gainChains({ amount: 2 })
            ]
        });
    }
}

TheyTellNoTales.id = 'they-tell-no-tales';

module.exports = TheyTellNoTales;
