const Card = require('../../Card.js');

class GemcoatVendor extends Card {
    //Action: Steal 1A. Deal 1D to $this.
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.sequential([
                ability.actions.steal(),
                ability.actions.dealDamage((context) => ({
                    target: context.source
                }))
            ]),
            effect: '窃取1琥珀并造成1点伤害对 {0}'
        });
    }
}

GemcoatVendor.id = 'gemcoat-vendor';

module.exports = GemcoatVendor;
