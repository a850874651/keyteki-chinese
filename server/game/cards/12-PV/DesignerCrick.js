const Card = require('../../Card.js');

class DesignerCrick extends Card {
    // Each time your opponent discards a card from their hand, draw a card and Designer Crick captures 1.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardDiscarded: (event, context) =>
                    event.location === 'hand' && event.card.controller !== context.source.controller
            },
            gameAction: [ability.actions.draw(), ability.actions.capture()],
            message: '{0} 使用 {1} 抽1张牌并抢占1琥珀',
            messageArgs: (context) => [context.player, context.source]
        });
    }
}

DesignerCrick.id = 'designer-crick';

module.exports = DesignerCrick;
