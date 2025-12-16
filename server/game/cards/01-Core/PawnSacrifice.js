const Card = require('../../Card.js');

class PawnSacrifice extends Card {
    // Play: Sacrifice a friendly creature. If you do, deal 3<D> each to 2 creatures.
    setupCardAbilities(ability) {
        this.play({
            target: {
                activePromptTitle: 'Choose a creature to sacrifice',
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.sacrifice()
            },
            then: {
                message: '{0} 使用 {1} 造成了3点伤害对 {2}',
                target: {
                    cardType: 'creature',
                    mode: 'exactly',
                    numCards: 2,
                    gameAction: ability.actions.dealDamage({ amount: 3 })
                }
            }
        });
    }
}

PawnSacrifice.id = 'pawn-sacrifice';

module.exports = PawnSacrifice;
