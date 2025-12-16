const Card = require('../../Card.js');

class Daat extends Card {
    // Play: Choose a house. That house becomes the active house.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'house'
            },
            effect: ' {1} 成为其当前势力',
            effectArgs: (context) => [context.house],
            gameAction: ability.actions.changeActiveHouse((context) => ({
                house: context.house
            }))
        });
    }
}

Daat.id = 'daat';

module.exports = Daat;
