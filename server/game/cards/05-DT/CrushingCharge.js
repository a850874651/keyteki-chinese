const Card = require('../../Card.js');

class CrushingCharge extends Card {
    // Play: Destroy each creature with power 4 or lower. Gain 1 chain.
    setupCardAbilities(ability) {
        this.play({
            gameAction: [
                ability.actions.destroy((context) => ({
                    target: context.game.creaturesInPlay.filter((card) => card.power <= 4)
                })),
                ability.actions.gainChains()
            ],
            effect: '摧毁每个力量小于等于4的生物并获得1枷锁'
        });
    }
}

CrushingCharge.id = 'crushing-charge';

module.exports = CrushingCharge;
