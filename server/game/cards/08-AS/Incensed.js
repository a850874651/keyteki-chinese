const Card = require('../../Card.js');

class Incensed extends Card {
    // Play: For the remainder of the turn, each friendly creature
    // gains, “After Fight: Gain 1A.”
    setupCardAbilities(ability) {
        this.play({
            effect:
                "在本回合剩余时间内给与每个友方生物 '战斗后：获得1琥珀' 的效果",
            gameAction: ability.actions.untilPlayerTurnEnd({
                match: (card) => card.type === 'creature',
                effect: ability.effects.gainAbility('fight', {
                    gameAction: ability.actions.gainAmber()
                })
            })
        });
    }
}

Incensed.id = 'incensed';

module.exports = Incensed;
