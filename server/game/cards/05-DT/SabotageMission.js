const _ = require('underscore');
const Card = require('../../Card.js');

class SabotageMission extends Card {
    // Play: Keys cost +1A for each different power value among friendly creatures during your opponent窶冱 next turn.
    setupCardAbilities(ability) {
        this.play({
            effect: "每有1个力量值不同的友方， {1}下回合钥匙费用+1",
            effectArgs: (context) => [context.player.opponent],
            gameAction: ability.actions.duringOpponentNextTurn((context) => ({
                targetController: 'any',
                effect: ability.effects.modifyKeyCost(
                    () => _.uniq(context.player.creaturesInPlay.map((card) => card.power)).length
                )
            }))
        });
    }
}

SabotageMission.id = 'sabotage-mission';

module.exports = SabotageMission;
