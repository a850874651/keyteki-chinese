const Card = require('../../Card.js');

class Wrangler extends Card {
    // Action: Each player gains 1A.
    setupCardAbilities(ability) {
        this.action({
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

Wrangler.id = 'wrangler';

module.exports = Wrangler;
