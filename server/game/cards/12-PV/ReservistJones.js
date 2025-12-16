const Card = require('../../Card.js');

class ReservistJones extends Card {
    // Deploy.
    // Play: Capture 2 amber for each of Reservist Jones's non-Star Alliance neighbors.
    setupCardAbilities(ability) {
        this.play({
            effect: '每有一个非星盟相邻生物抢占 2 琥珀',
            gameAction: ability.actions.capture((context) => ({
                amount:
                    context.source.neighbors.filter((card) => !card.hasHouse('staralliance'))
                        .length * 2
            }))
        });
    }
}

ReservistJones.id = 'reservist-jones';

module.exports = ReservistJones;
