const Card = require('../../Card.js');

class ThermalDepletion extends Card {
    // Play: Until the start of your next turn, creatures cannot ready.
    setupCardAbilities(ability) {
        this.play({
            effect: '在你的下回合开始前，生物无法重整',
            effectAlert: true,
            gameAction: ability.actions.untilPlayerNextTurnStart({
                targetController: 'any',
                effect: ability.effects.cardCannot('ready')
            })
        });
    }
}

ThermalDepletion.id = 'thermal-depletion';

module.exports = ThermalDepletion;
