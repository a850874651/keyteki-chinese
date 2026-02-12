const Card = require('../../Card.js');

class FiendishApprentice extends Card {
    // Play: For each friendly Dis creature, deal 3D to an enemy creature.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.allocateDamage((context) => ({
                cardCondition: (card, context) => card.controller !== context.player,
                damageStep: 3,
                numSteps: context.player.creaturesInPlay.filter((c) => c.hasHouse('dis')).length
            })),
            effect: '每有1个友方冥府生物，对1个生物造成3点伤害 ({1})',
            effectArgs: (context) => [
                context.player.creaturesInPlay.filter((c) => c.hasHouse('dis')).map((c) => c.name)
            ],
            then: {
                alwaysTriggers: true,
                condition: (context) => {
                    context.preThenEvents
                        .filter((event) => !event.cancelled && event.amount > 0)
                        .forEach((event) => {
                            context.game.addMessage(
                                '{0} 使用 {1} 来造成 {2} 伤害对 {3}',
                                context.player,
                                context.source,
                                event.amount,
                                event.card
                            );
                        });
                    return false;
                }
            }
        });
    }
}

FiendishApprentice.id = 'fiendish-apprentice';

module.exports = FiendishApprentice;
