const Card = require('../../Card.js');

class RichScore extends Card {
    // Play: Make a token creature. Steal A equal to half the number
    // of friendly token creatures (rounded up).
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.sequential([
                ability.actions.makeTokenCreature(),
                ability.actions.steal((context) => ({
                    amount: Math.ceil(
                        context.player.creaturesInPlay.filter((c) => c.isToken()).length / 2
                    )
                }))
            ]),
            effect: '制造1个代标生物并窃取 {1} 琥珀',
            effectArgs: (context) => [
                Math.ceil(
                    (context.player.creaturesInPlay.filter((c) => c.isToken()).length +
                        (context.player.deck.length > 0 ? 1 : 0)) /
                        2
                )
            ]
        });
    }
}

RichScore.id = 'rich-score';

module.exports = RichScore;
