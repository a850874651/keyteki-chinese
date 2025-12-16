const Card = require('../../Card.js');

class PhosphorusBlast extends Card {
    // Play: Deal 2D to each non-Mars creature.
    setupCardAbilities(ability) {
        this.play({
            effect: '对所有非火星生物造成2点伤害',
            gameAction: ability.actions.dealDamage((context) => ({
                amount: 2,
                target: context.game.creaturesInPlay.filter((card) => !card.hasHouse('mars'))
            }))
        });
    }
}

PhosphorusBlast.id = 'phosphorus-blast';

module.exports = PhosphorusBlast;
