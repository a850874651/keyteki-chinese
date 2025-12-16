const Card = require('../../Card.js');

class Arcenomometer extends Card {
    // Action: During your opponent窶冱 next turn, each time they play a
    // card, they lose 1A.
    setupCardAbilities(ability) {
        this.action({
            condition: (context) => !!context.player.opponent,
            effect: '在 {1} 的下回合中，他每打出1张牌，他失去1琥珀',
            effectArgs: (context) => context.player.opponent,
            effectAlert: true,
            gameAction: ability.actions.duringOpponentNextTurn({
                when: {
                    onCardPlayed: () => true
                },
                gameAction: ability.actions.loseAmber()
            })
        });
    }
}

Arcenomometer.id = 'arcenomometer';

module.exports = Arcenomometer;
