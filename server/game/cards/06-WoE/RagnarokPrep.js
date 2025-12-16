const Card = require('../../Card.js');

class RagnarokPrep extends Card {
    // Play: Make a token creature. Then, if you control more creatures than your opponent, your opponent loses 2A.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.makeTokenCreature(),
            then: {
                alwaysTriggers: true,
                condition: (context) =>
                    context.player.opponent &&
                    context.player.creaturesInPlay.length >
                        context.player.opponent.creaturesInPlay.length,
                gameAction: ability.actions.loseAmber({
                    amount: 2
                }),
                message: '{0} 使用 {1} 使 {3} 失去2琥珀',
                messageArgs: (context) => [
                    context.player.opponent,
                    context.player.opponent.amber >= 2 ? 2 : context.player.opponent.amber
                ]
            }
        });
    }
}

RagnarokPrep.id = 'ragnarok-prep';

module.exports = RagnarokPrep;
