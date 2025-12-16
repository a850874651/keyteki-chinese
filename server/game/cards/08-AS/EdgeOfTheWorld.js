const Card = require('../../Card.js');

class EdgeOfTheWorld extends Card {
    // Play: Move a creature to a flank of its controller窶冱 battleline. Steal 1A.
    setupCardAbilities(ability) {
        this.play({
            effect: '移动 {1} 到侧翼并窃取1琥珀',
            effectArgs: (context) => context.target,
            target: {
                cardType: 'creature',
                gameAction: ability.actions.moveToFlank()
            },
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.steal()
            }
        });
    }
}

EdgeOfTheWorld.id = 'edge-of-the-world';

module.exports = EdgeOfTheWorld;
