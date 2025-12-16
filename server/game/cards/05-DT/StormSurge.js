const Card = require('../../Card.js');

class StormSurge extends Card {
    // Play: Your opponent cannot ready cards during the "ready cards" step of their next turn.
    setupCardAbilities(ability) {
        this.play({
            effect:
                '跳过对手下回合的重整阶段',
            effectAlert: true,
            gameAction: ability.actions.duringOpponentNextTurn({
                targetController: 'opponent',
                effect: ability.effects.doesNotReady()
            })
        });
    }
}

StormSurge.id = 'storm-surge';

module.exports = StormSurge;
