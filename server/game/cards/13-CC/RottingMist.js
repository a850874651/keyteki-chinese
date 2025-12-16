const Card = require('../../Card.js');

class RottingMist extends Card {
    // Play: For the remainder of the turn, each enemy creature gets –1 power.
    setupCardAbilities(ability) {
        this.play({
            effect: '使所有敌方生物获得-1力量直到本回合结束',
            gameAction: ability.actions.untilPlayerTurnEnd({
                targetController: 'opponent',
                match: (card) => card.type === 'creature',
                effect: ability.effects.modifyPower(-1)
            })
        });
    }
}

RottingMist.id = 'rotting-mist';

module.exports = RottingMist;
