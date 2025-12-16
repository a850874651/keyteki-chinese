const Card = require('../../Card.js');

class TriangulatorNewsome extends Card {
    // After Reap: If you are haunted, move each from Triangulator
    // Newsome窶冱 neighbors to your pool.
    setupCardAbilities(ability) {
        this.reap({
            condition: (context) => context.player.isHaunted(),
            effect: "移动所有 {2} 琥珀从 {0} 的相邻生物上 ({3}) 到其琥珀池中",
            effectArgs: (context) => [
                context.source,
                context.source.neighbors.reduce((total, card) => total + card.amber, 0),
                context.source.neighbors
            ],
            gameAction: [
                ability.actions.removeAmber((context) => ({
                    all: true,
                    target: context.source.neighbors
                })),
                ability.actions.gainAmber((context) => ({
                    amount: context.source.neighbors.reduce((total, card) => total + card.amber, 0)
                }))
            ]
        });
    }
}

TriangulatorNewsome.id = 'triangulator-newsome';

module.exports = TriangulatorNewsome;
