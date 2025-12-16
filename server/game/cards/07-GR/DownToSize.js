const Card = require('../../Card.js');

class DownToSize extends Card {
    // Play: Choose an enemy creature. Until the end of the turn, that
    // creature is considered to have 1 power and 0 armor.
    setupCardAbilities(ability) {
        this.play({
            effect: '使得 {0} 具有1力量0护甲直到本回合结束',
            effectArgs: (context) => context.target,
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.cardLastingEffect({
                    effect: [ability.effects.setPower(1), ability.effects.setArmor(0)]
                })
            }
        });
    }
}

DownToSize.id = 'down-to-size';

module.exports = DownToSize;
