const Card = require('../../Card.js');

class LegateScipio extends Card {
    // Enhance .
    // Play: You may exalt each Saurian creature.
    setupCardAbilities(ability) {
        this.play({
            optional: true,
            gameAction: ability.actions.exalt((context) => ({
                target: context.game.creaturesInPlay.filter((card) => card.hasHouse('saurian'))
            })),
            effect: '褒奖每个蜥族生物'
        });
    }
}

LegateScipio.id = 'legate-scipio';

module.exports = LegateScipio;
