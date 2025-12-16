const Card = require('../../Card.js');

class SeekerMissiles extends Card {
    // Play: Deal 2D to a creature for each Skyborn flank creature.
    setupCardAbilities(ability) {
        this.play({
            effect: '每有1个侧翼天裔生物对1个生物造成2点伤害',
            gameAction: ability.actions.allocateDamage((context) => ({
                damageStep: 2,
                numSteps: context.game.creaturesInPlay.filter(
                    (card) => card.hasHouse('skyborn') && card.isOnFlank()
                ).length
            }))
        });
    }
}

SeekerMissiles.id = 'seeker-missiles';

module.exports = SeekerMissiles;
