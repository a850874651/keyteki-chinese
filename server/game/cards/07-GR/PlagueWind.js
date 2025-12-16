const Card = require('../../Card.js');

class PlagueWind extends Card {
    // Play: Until the end of the turn, each non-Mars creature gets -3 power.
    setupCardAbilities(ability) {
        this.play({
            effect: '给与每个非火星生物-3力量直到本回合结束',
            gameAction: ability.actions.untilPlayerTurnEnd({
                targetController: 'any',
                match: (card) => !card.hasHouse('mars'),
                effect: ability.effects.modifyPower(-3)
            })
        });
    }
}

PlagueWind.id = 'plague-wind';

module.exports = PlagueWind;
