const Card = require('../../Card.js');

class MidyearFestivities extends Card {
    // Play: Choose 9 creatures. Move all on the chosen creatures to
    // their controllers’ pools. Destroy the chosen creatures.
    setupCardAbilities(ability) {
        this.play({
            effectStyle: 'append',
            target: {
                mode: 'exactly',
                numCards: 9,
                cardType: 'creature',
                controller: 'any',
                gameAction: ability.actions.returnAmber({
                    controllerRecipient: true,
                    all: true
                })
            },
            then: (preThenContext) => ({
                alwaysTriggers: true,
                message: '{0} 使用 {1} 摧毁 {3}',
                messageArgs: [preThenContext.target],
                gameAction: ability.actions.destroy({
                    target: preThenContext.target
                })
            })
        });
    }
}

MidyearFestivities.id = 'midyear-festivities';

module.exports = MidyearFestivities;
