const Card = require('../../Card.js');
const { eachNeighbor } = require('../../helpers/eachNeighbor.js');

class Badgemagus extends Card {
    // Deploy. (This creature can enter play anywhere in your battleline.)
    // Fight: Ready and fight with each of Badgemagus's neighbors, one at a time.
    setupCardAbilities(ability) {
        this.fight(
            eachNeighbor({
                effect: '重整并使其相邻生物逐一战斗',
                gameAction: (props) =>
                    ability.actions.sequential([
                        ability.actions.ready(props),
                        ability.actions.fight(props)
                    ])
            })
        );
    }
}

Badgemagus.id = 'badgemagus';

module.exports = Badgemagus;
