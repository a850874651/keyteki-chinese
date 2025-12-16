const Card = require('../../Card.js');

class ShrewdInvestor extends Card {
    // Play: You may have your opponent gain 1Aember. If you do,
    // capture 4Aember.
    setupCardAbilities(ability) {
        this.play({
            optional: true,
            gameAction: ability.actions.sequential([
                ability.actions.gainAmber((context) => ({
                    target: context.player.opponent
                })),
                ability.actions.capture({ amount: 4 })
            ]),
            message: '{0} 使用 {1} 使 {2} 获得1琥珀, 然后抢占4琥珀',
            messageArgs: (context) => [context.player, this, context.player.opponent]
        });
    }
}

ShrewdInvestor.id = 'shrewd-investor';

module.exports = ShrewdInvestor;
