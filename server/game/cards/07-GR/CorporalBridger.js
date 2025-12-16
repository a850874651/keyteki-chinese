const Card = require('../../Card.js');

class CorporalBridger extends Card {
    // Play/After Fight/After Reap: You may use a non-Star Alliance
    // creature this turn.
    setupCardAbilities(ability) {
        this.play({
            fight: true,
            reap: true,
            effect: '本回合允许其使用1个非星盟生物',
            gameAction: ability.actions.untilPlayerTurnEnd({
                effect: ability.effects.canUseNonHouseCreature('staralliance')
            })
        });
    }
}

CorporalBridger.id = 'corporal-bridger';

module.exports = CorporalBridger;
