const Card = require('../../Card.js');

class GruntWork extends Card {
    // Play: Look at the top 3 cards of your deck and put them back in
    // any order. Make a token creature.
    setupCardAbilities(ability) {
        this.play({
            effect:
                '查看你牌库顶的3张牌，并按任意顺序放回，制造1个代标生物',
            gameAction: ability.actions.sequential([
                ability.actions.rearrangeCards({ amount: 3 }),
                ability.actions.makeTokenCreature()
            ])
        });
    }
}

GruntWork.id = 'grunt-work';

module.exports = GruntWork;
