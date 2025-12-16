const Card = require('../../Card.js');

class Socraterosaurus extends Card {
    // After Reap: Draw 1 card. You may put a wisdom counter on
    // Platopelta.
    setupCardAbilities(ability) {
        this.reap({
            effect: '抽1张牌，可以放置1个指示物在 柏拉图胄龙 上',
            gameAction: ability.actions.draw(),
            then: {
                alwaysTriggers: true,
                target: {
                    cardCondition: (card) => card.name === 'Platopelta',
                    optional: true,
                    location: 'play area',
                    controller: 'any',
                    numCards: 1,
                    gameAction: ability.actions.addWisdomCounter()
                }
            }
        });
    }
}

Socraterosaurus.id = 'socraterosaurus';

module.exports = Socraterosaurus;
