const Card = require('../../Card.js');

class Colossipede extends Card {
    // Each friendly creature with A on it gains, “After Fight: Move
    // each A on this creature to your pool.”
    // Play: Exalt each creature.
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) => card.type === 'creature',
            effect: ability.effects.gainAbility('fight', {
                gameAction: ability.actions.removeAmber({ all: true }),
                effect: '移动所有琥珀从 {0} 到其琥珀池中',
                then: {
                    gameAction: ability.actions.gainAmber((context) => ({
                        amount: context.preThenEvent.amount
                    }))
                }
            })
        });

        this.play({
            gameAction: ability.actions.exalt((context) => ({
                target: context.game.creaturesInPlay
            }))
        });
    }
}

Colossipede.id = 'colossipede';

module.exports = Colossipede;
