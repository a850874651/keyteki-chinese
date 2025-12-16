const Card = require('../../Card.js');

class StrengthFromDiversity extends Card {
    // Play: Each friendly non-Star Alliance creature captures 1.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.capture((context) => ({
                target: context.player.creaturesInPlay.filter((c) => !c.hasHouse('staralliance'))
            })),
            effect: '使每个友方非星盟生物抢占1琥珀'
        });
    }
}

StrengthFromDiversity.id = 'strength-from-diversity';

module.exports = StrengthFromDiversity;
