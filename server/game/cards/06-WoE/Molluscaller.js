const Card = require('../../Card.js');

class Molluscaller extends Card {
    // After Reap: For the remainder of the turn, each friendly
    // Strange Shell gets +3 power and loses all abilities.
    setupCardAbilities(ability) {
        this.reap({
            effect:
                '在本回合的剩余时间内使所有友方奇怪的甲壳获得获得+3力量并失去其能力',
            gameAction: ability.actions.untilPlayerTurnEnd({
                match: (card) => card.name === 'Strange Shell',
                effect: [ability.effects.blank(), ability.effects.modifyPower(3)]
            })
        });
    }
}

Molluscaller.id = 'molluscaller';

module.exports = Molluscaller;
