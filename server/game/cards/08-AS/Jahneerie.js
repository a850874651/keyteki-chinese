const Card = require('../../Card.js');

class Jahneerie extends Card {
    // Each friendly creature with A on it gains, “After Reap: Move 1A
    // from this creature to your pool.”
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) => card.type === 'creature' && card.amber > 0,
            effect: ability.effects.gainAbility('reap', {
                effect: '移动1琥珀从 {0} 到其琥珀池',
                gameAction: ability.actions.removeAmber(),
                then: {
                    gameAction: ability.actions.gainAmber()
                }
            })
        });
    }
}

Jahneerie.id = 'jahneerie';

module.exports = Jahneerie;
