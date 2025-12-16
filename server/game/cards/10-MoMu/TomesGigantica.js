const Card = require('../../Card.js');

class TomesGigantica extends Card {
    // Play: Search your deck and discard pile for two halves of a
    // gigantic creature, reveal them, and put them in your
    // hand. Purge Tomes Gigantica.
    setupCardAbilities(ability) {
        this.play({
            effect: '寻找1个巨大生物的两个部分，并将它们放入手中',
            gameAction: ability.actions.search({
                cardCondition: (card) => card.gigantic,
                amount: 2,
                destination: 'hand'
            }),
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.purge((context) => ({
                    target: context.source
                })),
                message: '{0} 使用 {1} 清除 {1}'
            }
        });
    }
}

TomesGigantica.id = 'tomes-gigantica';

module.exports = TomesGigantica;
