const Card = require('../../Card.js');

class MarcellaTheYounger extends Card {
    // After Fight/After Reap: You may exalt Marcella, the Younger. If you do, draw 2 cards.
    setupCardAbilities(ability) {
        this.fight({
            optional: true,
            reap: true,
            gameAction: ability.actions.exalt(),
            then: {
                message: '{0} 使用 {1} 抽2张牌',
                gameAction: ability.actions.draw({ amount: 2 })
            }
        });
    }
}

MarcellaTheYounger.id = 'marcella-the-younger';

module.exports = MarcellaTheYounger;
