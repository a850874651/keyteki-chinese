const _ = require('underscore');
const Card = require('../../Card.js');

class AdultSwim extends Card {
    //Play: Put each creature with power 3 or lower on top of its owner's deck in a random order.
    setupCardAbilities(ability) {
        this.play({
            effect: "将每个力量小于等于3的生物以随机顺序放置到其所有者的牌库顶",
            gameAction: ability.actions.returnToDeck((context) => ({
                target: _.shuffle(context.game.creaturesInPlay.filter((card) => card.power <= 3))
            }))
        });
    }
}

AdultSwim.id = 'adult-swim';

module.exports = AdultSwim;
