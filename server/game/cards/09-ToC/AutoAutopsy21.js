const Card = require('../../Card.js');

class AutoAutopsy21 extends Card {
    // Play: Make a token creature.
    // Omni: Destroy a friendly creature. If you do, gain 1A.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.makeTokenCreature()
        });

        this.omni({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.destroy()
            },
            then: {
                gameAction: ability.actions.gainAmber(),
                message: '{0} 使用 {1} 获得1琥珀'
            }
        });
    }
}

AutoAutopsy21.id = 'auto-autopsy-21';

module.exports = AutoAutopsy21;
