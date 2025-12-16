const Card = require('../../Card.js');

class FeldarsPlan extends Card {
    // Play: During your opponent's next turn, each time they play a card, steal 1A.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            effect: ' {1} 下回合每打出1张牌，窃取1琥珀',
            effectArgs: (context) => context.player.opponent,
            effectAlert: true,
            gameAction: ability.actions.duringOpponentNextTurn({
                when: {
                    onCardPlayed: () => true
                },
                message: '{0} 使用 {1} 窃取1琥珀从 {2}',
                messageArgs: (context) => [context.player.opponent, context.source, context.player],
                gameAction: ability.actions.steal()
            })
        });
    }
}

FeldarsPlan.id = 'feldar-s-plan';

module.exports = FeldarsPlan;
