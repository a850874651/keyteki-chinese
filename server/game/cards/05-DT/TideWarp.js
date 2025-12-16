const Card = require('../../Card.js');

class TideWarp extends Card {
    // (T) At the start of your turn, if the tide is high, your opponent raises the tide. Otherwise, you raise the tide.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onTurnStart: (_, context) => context.player === this.game.activePlayer
            },
            gameAction: ability.actions.raiseTide((context) => ({
                target: context.player.isTideHigh() ? context.player.opponent : context.player
            })),
            effect: '为 {1} 抬升潮位',
            effectArgs: (context) =>
                context.player.isTideHigh() ? context.player.opponent : context.player
        });
    }
}

TideWarp.id = 'tide-warp';

module.exports = TideWarp;
