const Card = require('../../Card.js');

class LieutenantValmart extends Card {
    // (T) Play/Fight/Reap: If the tide is high, keys cost +3A during your opponent's next turn.
    setupCardAbilities(ability) {
        this.play({
            fight: true,
            reap: true,
            condition: (context) => context.player.isTideHigh(),
            effect: "在 {1} 的下个回合，钥匙费用+3",
            effectArgs: (context) => context.player.opponent,
            gameAction: ability.actions.duringOpponentNextTurn({
                targetController: 'any',
                effect: ability.effects.modifyKeyCost(3)
            })
        });
    }
}

LieutenantValmart.id = 'lieutenant-valmart';

module.exports = LieutenantValmart;
