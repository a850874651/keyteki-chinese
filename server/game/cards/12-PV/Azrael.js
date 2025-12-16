const Card = require('../../Card.js');

class Azrael extends Card {
    // After Reap: Until the end of the turn, each friendly creature may fight.
    setupCardAbilities(ability) {
        this.reap({
            effect: '直到本回合结束允许每个友方生物进行战斗',
            gameAction: ability.actions.untilPlayerTurnEnd({
                effect: ability.effects.canFight(() => true)
            })
        });
    }
}

Azrael.id = 'azrael';

module.exports = Azrael;
