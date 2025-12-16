const Card = require('../../Card.js');

class Umwas extends Card {
    // Play: Make a token creature. Give each friendly token creature
    // a +1 power counter.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.makeTokenCreature(),
            then: {
                alwaysTriggers: true,
                message: '{0} 使用 {1} 为每个友方代标生物增加1力量指示物',
                gameAction: ability.actions.addPowerCounter((context) => ({
                    target: context.player.creaturesInPlay.filter((card) => card.isToken())
                }))
            }
        });
    }
}

Umwas.id = 'umwas';

module.exports = Umwas;
