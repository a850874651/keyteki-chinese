const Card = require('../../Card.js');

class Senator extends Card {
    // Action: Keys cost +1A during your opponent's next turn.
    setupCardAbilities(ability) {
        this.action({
            effect: "在 {1} 的下回合中，钥匙费用增加1",
            effectArgs: (context) => context.player.opponent,
            gameAction: ability.actions.duringOpponentNextTurn({
                targetController: 'any',
                effect: ability.effects.modifyKeyCost(1)
            })
        });
    }
}

Senator.id = 'senator';

module.exports = Senator;
