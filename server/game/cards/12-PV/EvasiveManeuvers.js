const Card = require('../../Card.js');

class EvasiveManeuvers extends Card {
    // Play: For the remainder of the turn, friendly creatures cannot be dealt damage.
    // Fate: Deal 2 to each friendly creature
    setupCardAbilities(ability) {
        this.play({
            effect: '本回合内友方生物不会再受到伤害',
            gameAction: ability.actions.untilPlayerTurnEnd({
                targetController: 'current',
                effect: ability.effects.cardCannot('damage')
            })
        });

        this.fate({
            effect: '对每个友方生物造成2点伤害',
            gameAction: ability.actions.dealDamage((context) => ({
                target: context.game.activePlayer.creaturesInPlay,
                amount: 2
            }))
        });
    }
}

EvasiveManeuvers.id = 'evasive-maneuvers';

module.exports = EvasiveManeuvers;
