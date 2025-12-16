const Card = require('../../Card.js');

class Weasand extends Card {
    // Deploy. Elusive.
    // If Weasand is on a flank, destroy it.
    // After a player forges a key, gain 2A.
    setupCardAbilities(ability) {
        this.interrupt({
            condition: (context) => !!context.player.opponent,
            when: {
                onForgeKey: () => true
            },
            gameAction: ability.actions.gainAmber({ amount: 2 })
        });

        this.persistentEffect({
            effect: ability.effects.terminalCondition({
                condition: (context) => context.source.isOnFlank(),
                message: '{0} 因为其在侧翼而被摧毁',
                gameAction: ability.actions.destroy()
            })
        });
    }
}

Weasand.id = 'weasand';

module.exports = Weasand;
