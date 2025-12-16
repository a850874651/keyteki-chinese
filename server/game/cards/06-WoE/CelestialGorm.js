const Card = require('../../Card.js');

class CelestialGorm extends Card {
    //Omni: Destroy $this. Return each other artifact to its owner's hand.
    setupCardAbilities(ability) {
        this.omni({
            gameAction: ability.actions.sequential([
                ability.actions.destroy((context) => ({
                    target: context.source
                })),
                ability.actions.returnToHand((context) => ({
                    target: context.game.cardsInPlay.filter(
                        (card) => card.type === 'artifact' && card !== context.source
                    )
                }))
            ]),
            effect: "摧毁 {0} 并将每个其他神器返回其所有者手中"
        });
    }
}

CelestialGorm.id = 'celestial-gorm';

module.exports = CelestialGorm;
