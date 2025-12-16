const Card = require('../../Card.js');

class MartianPropagandist extends Card {
    // Play/After Reap: For the remainder of the turn, each of Martian Propagandist's neighbors belong to house Mars.
    setupCardAbilities(ability) {
        this.play({
            reap: true,
            gameAction: ability.actions.cardLastingEffect((context) => ({
                effect: ability.effects.changeHouse('mars'),
                target: context.source.neighbors
            })),
            effect: '使其相邻生物在本回合剩余时间中属于火星势力'
        });
    }
}

MartianPropagandist.id = 'martian-propagandist';

module.exports = MartianPropagandist;
