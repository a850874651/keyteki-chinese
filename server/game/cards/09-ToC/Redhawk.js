const Card = require('../../Card.js');

class Redhawk extends Card {
    // Action: Each player gains 1A. Make a token creature.
    setupCardAbilities(ability) {
        this.action({
            effect: '使每位玩家获得1琥珀并制造1个代标生物',
            gameAction: [
                ability.actions.gainAmber(),
                ability.actions.gainAmber((context) => ({
                    target: context.player.opponent
                })),
                ability.actions.makeTokenCreature()
            ]
        });
    }
}

Redhawk.id = 'redhawk';

module.exports = Redhawk;
