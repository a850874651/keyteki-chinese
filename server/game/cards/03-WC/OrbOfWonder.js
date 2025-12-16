const Card = require('../../Card.js');

class OrbOfWonder extends Card {
    // Omni: Destroy Orb of Wonder. If you do, search your deck for a card and put it into your hand. Shuffle your deck.
    setupCardAbilities(ability) {
        this.omni({
            gameAction: ability.actions.sacrifice(),
            then: {
                message: '{0} 使用 {1} 移动1张卡牌从他的牌库到手中',
                gameAction: ability.actions.search({
                    location: ['deck'],
                    amount: 1,
                    reveal: false
                })
            }
        });
    }
}

OrbOfWonder.id = 'orb-of-wonder';

module.exports = OrbOfWonder;
