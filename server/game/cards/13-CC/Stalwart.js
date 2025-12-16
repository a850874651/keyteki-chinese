const Card = require('../../Card.js');

class Stalwart extends Card {
    // Deploy. Skirmish. Taunt.
    // After Fight: You may move Stalwart anywhere in your battleline.
    setupCardAbilities(ability) {
        this.fight({
            optional: true,
            gameAction: ability.actions.moveOnBattleline((context) => ({
                target: context.source,
                player: context.player
            })),
            effect: '移动 {0} 到其战线的任意位置'
        });
    }
}

Stalwart.id = 'stalwart';

module.exports = Stalwart;
