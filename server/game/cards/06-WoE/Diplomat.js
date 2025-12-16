const Card = require('../../Card.js');

class Diplomat extends Card {
    // After Reap: Each player gains 1 Aember.
    setupCardAbilities(ability) {
        this.reap({
            effect: '使每位玩家获得1琥珀',
            gameAction: [
                ability.actions.gainAmber(),
                ability.actions.gainAmber((context) => ({
                    target: context.player.opponent
                }))
            ]
        });
    }
}

Diplomat.id = 'diplomat';

module.exports = Diplomat;
