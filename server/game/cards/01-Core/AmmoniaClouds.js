const Card = require('../../Card.js');

class AmmoniaClouds extends Card {
    // Play: Deal 3<D> to each creature.
    setupCardAbilities(ability) {
        this.play({
            effect: '对所有生物造成3点伤害({1})',
            effectArgs: (context) => [context.game.creaturesInPlay],
            gameAction: ability.actions.dealDamage((context) => ({
                amount: 3,
                target: context.game.creaturesInPlay
            }))
        });
    }
}

AmmoniaClouds.id = 'ammonia-clouds';

module.exports = AmmoniaClouds;
