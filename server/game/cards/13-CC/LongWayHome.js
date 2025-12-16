const Card = require('../../Card.js');

class LongWayHome extends Card {
    // Play: Archive each friendly Skyborn creature from play.
    setupCardAbilities(ability) {
        this.play({
            effect: '归档所有友方天裔生物',
            gameAction: ability.actions.archive((context) => ({
                target: context.game.creaturesInPlay.filter(
                    (card) => card.hasHouse('skyborn') && card.controller === context.player
                )
            }))
        });
    }
}

LongWayHome.id = 'long-way-home';

module.exports = LongWayHome;
