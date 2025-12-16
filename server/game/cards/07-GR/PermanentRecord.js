const Card = require('../../Card.js');

class PermanentRecord extends Card {
    // Play: Exhaust a friendly creature. If you do, steal 2A.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.exhaust()
            },
            then: {
                condition: (context) => context.player.opponent,
                gameAction: ability.actions.steal({ amount: 2 }),
                message: '{0} 使用 {1} 窃取2琥珀'
            }
        });
    }
}

PermanentRecord.id = 'permanent-record';

module.exports = PermanentRecord;
