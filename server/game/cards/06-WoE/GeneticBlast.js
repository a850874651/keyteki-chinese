const Card = require('../../Card.js');

class GeneticBlast extends Card {
    // Play: Deal 2Damage to a creature and each other creature with
    // the same name as that creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature'
            },
            effect: '对 {1} 造成2点伤害，也对每个与其同名的生物造成2点伤害',
            effectArgs: (context) => [context.target],
            then: (preThenContext) => ({
                alwaysTriggers: true,
                gameAction: ability.actions.dealDamage((context) => ({
                    target: context.game.cardsInPlay.filter(
                        (card) =>
                            card.name === preThenContext.target.name && card.type === 'creature'
                    ),
                    amount: 2
                }))
            })
        });
    }
}

GeneticBlast.id = 'genetic-blast';

module.exports = GeneticBlast;
