const Card = require('../../Card.js');

class LoyaltyImplants extends Card {
    // Omni: Destroy Loyalty Implants. You may use friendly Mars
    // creatures this turn.
    setupCardAbilities(ability) {
        this.omni({
            effect: '摧毁 {0} 使得本回合可以使用友方火星生物',
            gameAction: [
                ability.actions.destroy(),
                ability.actions.untilPlayerTurnEnd({
                    effect: ability.effects.canUse(
                        (card) => card.hasHouse('mars') && card.type === 'creature'
                    )
                })
            ]
        });
    }
}

LoyaltyImplants.id = 'loyalty-implants';

module.exports = LoyaltyImplants;
