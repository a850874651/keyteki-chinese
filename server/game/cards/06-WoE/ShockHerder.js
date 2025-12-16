const Card = require('../../Card.js');

class ShockHerder extends Card {
    // Deploy. (This creature can enter play anywhere in your battleline.)
    // Play: Ready and fight with a neighboring creature.
    setupCardAbilities(ability) {
        this.play({
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

ShockHerder.id = 'shock-herder';

module.exports = ShockHerder;
