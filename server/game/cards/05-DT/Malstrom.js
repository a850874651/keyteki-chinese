const Card = require('../../Card.js');
const _ = require('underscore');

class Malstrom extends Card {
    // Play: Put each creature on top of its owner's deck in a random order. Gain 2 chains.
    setupCardAbilities(ability) {
        this.play({
            effect: "将每个生物按随机顺序放到其所有者的牌库顶，获得2枷锁",
            gameAction: ability.actions.sequential([
                ability.actions.returnToDeck((context) => ({
                    target: _.shuffle(context.game.creaturesInPlay)
                })),
                ability.actions.gainChains({ amount: 2 })
            ])
        });
    }
}

Malstrom.id = 'mælstrom';

module.exports = Malstrom;
