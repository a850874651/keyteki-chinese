const Card = require('../../Card.js');

class NeotechnicGopher extends Card {
    // Play/After Reap: Discard a card. If you have no cards in your hand, gain 1 amber.
    // Fate: Your opponent draws a card.
    setupCardAbilities(ability) {
        this.play({
            reap: true,
            preferActionPromptMessage: true,
            target: {
                activePromptTitle: '选择1张牌弃置',
                location: 'hand',
                controller: 'self',
                gameAction: ability.actions.discard()
            },
            then: {
                alwaysTriggers: true,
                condition: (context) => context.player.hand.length === 0,
                gameAction: ability.actions.gainAmber(),
                message: '{0} uses {1} to gain 1 amber'
            }
        });

        this.fate({
            effect: '使对手抽1张牌',
            gameAction: ability.actions.draw((context) => ({
                target: context.game.activePlayer.opponent
            }))
        });
    }
}

NeotechnicGopher.id = 'neotechnic-gopher';

module.exports = NeotechnicGopher;
