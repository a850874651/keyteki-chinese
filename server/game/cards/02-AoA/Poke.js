const Card = require('../../Card.js');

class Poke extends Card {
    // Play: Deal 1D to an enemy creature. If this damage destroys that creature, draw a card.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.dealDamage({ amount: 1 })
            },
            then: {
                condition: (context) =>
                    context.preThenEvent.destroyEvent &&
                    context.preThenEvent.destroyEvent.destroyedByDamageDealt &&
                    context.preThenEvent.destroyEvent.resolved,
                message: '{0} 使用 {1} 抽1张牌',
                gameAction: ability.actions.draw()
            }
        });
    }
}

Poke.id = 'poke';

module.exports = Poke;
