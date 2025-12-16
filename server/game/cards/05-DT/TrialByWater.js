const Card = require('../../Card.js');

class TrialByWater extends Card {
    // (T) Play: Reset the tide. Until the start of your next turn, players cannot raise the tide.
    setupCardAbilities(ability) {
        this.play({
            effect: '直到你的下个回合开始前，玩家无法抬潮',
            effectAlert: true,
            gameAction: [
                ability.actions.resetTide(),
                ability.actions.untilPlayerNextTurnStart({
                    targetController: 'any',
                    effect: ability.effects.playerCannot('raiseTide')
                })
            ]
        });
    }
}

TrialByWater.id = 'trial-by-water';

module.exports = TrialByWater;
