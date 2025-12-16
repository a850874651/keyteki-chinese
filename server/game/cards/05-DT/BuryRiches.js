const Card = require('../../Card.js');

class BuryRiches extends Card {
    // (T) Play: If the tide is high, move 1A from each creature to its controller's pool. Otherwise, raise the tide.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.conditional({
                condition: (context) => !context.player.isTideHigh(),
                trueGameAction: ability.actions.raiseTide(),
                falseGameAction: [
                    ability.actions.removeAmber((context) => ({
                        target: context.player.creaturesInPlay
                    })),
                    ability.actions.removeAmber((context) => ({
                        target: context.player.opponent
                            ? context.player.opponent.creaturesInPlay
                            : []
                    })),
                    ability.actions.gainAmber((context) => ({
                        amount: context.player.creaturesInPlay.filter((card) => card.amber).length
                    })),
                    ability.actions.gainAmber((context) => ({
                        target: context.player.opponent,
                        amount: context.player.opponent
                            ? context.player.opponent.creaturesInPlay.filter((card) => card.amber)
                                  .length
                            : 0
                    }))
                ]
            }),
            effect: '{1}',
            effectArgs: (context) =>
                !context.player.isTideHigh()
                    ? '抬升潮位'
                    : "从每个生物移动1琥珀到其控制者的琥珀池中"
        });
    }
}

BuryRiches.id = 'bury-riches';

module.exports = BuryRiches;
