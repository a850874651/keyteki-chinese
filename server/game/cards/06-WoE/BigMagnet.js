const Card = require('../../Card.js');

class BigMagnet extends Card {
    // Play: Choose a friendly creature. Take control of each upgrade in play and move it to that creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                controller: 'self',
                cardType: 'creature',
                gameAction: ability.actions.moveUpgrade((context) => ({
                    upgrades: context.game.creaturesInPlay
                        .filter((card) => card.upgrades.length > 0)
                        .flatMap((card) => card.upgrades || [])
                }))
            },
            effect: '获得场上每个升级的控制权并将它们移至{0}'
        });
    }
}

BigMagnet.id = 'big-magnet';

module.exports = BigMagnet;
