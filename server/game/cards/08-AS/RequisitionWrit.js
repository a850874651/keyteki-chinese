const Card = require('../../Card.js');

class RequisitionWrit extends Card {
    // This creature gains, 窶廣fter Reap: Pay your opponent 1A. If you
    // do, take control of an enemy creature."
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.gainAbility('reap', {
                gameAction: ability.actions.transferAmber((context) => ({
                    target: context.player,
                    amount: 1
                })),
                then: {
                    target: {
                        controller: 'opponent',
                        cardType: 'creature',
                        gameAction: ability.actions.cardLastingEffect((context) => ({
                            duration: 'lastingEffect',
                            effect: ability.effects.takeControl(context.player)
                        }))
                    },
                    message: '{0} 使用 {1} 获得 {3} 的控制权',
                    messageArgs: (context) => [context.target]
                }
            })
        });
    }
}

RequisitionWrit.id = 'requisition-writ';

module.exports = RequisitionWrit;
