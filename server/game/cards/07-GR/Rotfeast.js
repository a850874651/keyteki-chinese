const Card = require('../../Card.js');

class Rotfeast extends Card {
    // Play: For the remainder of the turn, gain 1 each time a
    // creature is dealt damage.
    setupCardAbilities(ability) {
        this.play({
            effect:
                '在本回合剩余时间内，每有生物受到伤害，获得1琥珀',
            gameAction: ability.actions.untilPlayerTurnEnd({
                when: {
                    onDamageApplied: (event) => event.amount > 0
                },
                gameAction: ability.actions.gainAmber((context) => ({ target: context.player }))
            })
        });
    }
}

Rotfeast.id = 'rotfeast';

module.exports = Rotfeast;
