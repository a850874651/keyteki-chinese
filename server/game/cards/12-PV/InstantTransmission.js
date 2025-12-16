const Card = require('../../Card.js');

class InstantTransmission extends Card {
    // Omni: Draw 3 cards. Destroy Instant Transmission.
    setupCardAbilities(ability) {
        this.omni({
            gameAction: [ability.actions.draw({ amount: 3 }), ability.actions.destroy()],
            message: '{0} 使用 {1} 抽3张卡牌并摧毁它',
            messageArgs: (context) => [context.player, context.source]
        });
    }
}

InstantTransmission.id = 'instant-transmission';

module.exports = InstantTransmission;
