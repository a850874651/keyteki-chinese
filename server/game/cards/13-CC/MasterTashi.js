const Card = require('../../Card.js');

class MasterTashi extends Card {
    // After Fight: Ready and reap with a neighboring creature.
    // After Reap: Ready and fight with a neighboring creature.
    setupCardAbilities(ability) {
        this.fight({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card, context) => context.source.neighbors.includes(card),
                gameAction: ability.actions.sequential([
                    ability.actions.ready(),
                    ability.actions.reap()
                ])
            },
            effect: '重整并使用一个相邻生物进行收获'
        });

        this.reap({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card, context) => context.source.neighbors.includes(card),
                gameAction: ability.actions.sequential([
                    ability.actions.ready(),
                    ability.actions.fight()
                ])
            },
            effect: '重整并使用一个相邻生物进行战斗'
        });
    }
}

MasterTashi.id = 'master-tashi';

module.exports = MasterTashi;
