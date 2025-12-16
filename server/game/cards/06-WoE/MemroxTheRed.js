const Card = require('../../Card.js');

class MemroxTheRed extends Card {
    // Your opponent's cards cannot leave your archives.
    //
    // Action: Gain 1Aember for each card in your archives.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) => context.player === context.source.controller,
            location: 'play area',
            effect: ability.effects.opponentCardsCannotLeaveArchives(this)
        });

        this.action({
            effect: '你每有1张牌在你的档案中，获得 {1} 琥珀',
            effectArgs: (context) => [context.player.archives.length],
            gameAction: ability.actions.gainAmber((context) => ({
                amount: context.player.archives.length
            }))
        });
    }
}

MemroxTheRed.id = 'memrox-the-red';

module.exports = MemroxTheRed;
