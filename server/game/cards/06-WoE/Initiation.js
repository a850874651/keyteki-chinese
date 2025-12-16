const Card = require('../../Card.js');

class Initiation extends Card {
    //Play: Make a token creature. If you have fewer than 4 cards in hand, archive Initiation.
    setupCardAbilities(ability) {
        this.play({
            effect: '制造1个代标生物{1}',
            effectArgs: (context) => (context.player.hand.length < 4 ? ' 并归档其自身' : ''),
            gameAction: ability.actions.sequential([
                ability.actions.makeTokenCreature(),
                ability.actions.conditional({
                    condition: (context) => context.player.hand.length < 4,
                    trueGameAction: ability.actions.archive()
                })
            ])
        });
    }
}

Initiation.id = 'initiation';

module.exports = Initiation;
