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
            effect: '每有1个友方冥府生物，对1个生物造成3点伤害'
        });
    }
}

FiendishApprentice.id = 'fiendish-apprentice';

module.exports = FiendishApprentice;
