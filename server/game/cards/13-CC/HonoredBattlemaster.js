const Card = require('../../Card.js');

class HonoredBattlemaster extends Card {
    // Enhance . Action: Ready and fight with one of Honored Battlemaster's neighbors.
    setupCardAbilities(ability) {
        this.action({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card, context) => context.source.neighbors.includes(card),
                gameAction: ability.actions.sequential([
                    ability.actions.ready(),
                    ability.actions.fight()
                ])
            },
            effect: '重整并使一个相邻生物战斗'
        });
    }
}

HonoredBattlemaster.id = 'honored-battlemaster';

module.exports = HonoredBattlemaster;
