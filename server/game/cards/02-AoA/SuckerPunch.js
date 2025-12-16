const Card = require('../../Card.js');

class SuckerPunch extends Card {
    // Alpha. (You can only play this card before doing anything else this step.)
    // Play: Deal 2D to an enemy creature.
    // If that creature is destroyed by this effect, archive Sucker Punch.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.dealDamage({ amount: 2 })
            },
            then: {
                condition: (context) =>
                    context.preThenEvent.destroyEvent &&
                    context.preThenEvent.destroyEvent.destroyedByDamageDealt &&
                    context.preThenEvent.destroyEvent.resolved,
                gameAction: ability.actions.archive(),
                message: '{0} 使用 {1} 归档1张卡牌'
            }
        });
    }
}

SuckerPunch.id = 'sucker-punch';

module.exports = SuckerPunch;
