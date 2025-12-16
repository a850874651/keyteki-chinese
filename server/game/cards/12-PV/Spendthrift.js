const Card = require('../../Card.js');

class Spendthrift extends Card {
    // Play: Move each A from a creature to the common supply. Exalt that creature.
    // Fate: Move each A from enemy creatures to your opponent's pool.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                gameAction: [ability.actions.removeAmber({ all: true }), ability.actions.exalt()]
            },
            effect: '移动 所有 {2} 琥珀从 {0} 身上到公共供应堆并褒奖 {0}',
            effectArgs: (context) => [context.target, context.target.tokens.amber || 0]
        });

        this.fate({
            effect: "将所有 {1} 琥珀从敌方生物身上移动到到敌方琥珀池中",
            effectArgs: (context) => [
                context.game.activePlayer.opponent.creaturesInPlay.reduce(
                    (total, card) => total + card.amber,
                    0
                )
            ],
            gameAction: [
                ability.actions.removeAmber((context) => ({
                    all: true,
                    target: context.game.activePlayer.opponent.creaturesInPlay.filter((card) =>
                        card.hasToken('amber')
                    )
                })),
                ability.actions.gainAmber((context) => ({
                    target: context.game.activePlayer.opponent,
                    amount: context.game.activePlayer.opponent.creaturesInPlay.reduce(
                        (total, card) => total + card.amber,
                        0
                    )
                }))
            ]
        });
    }
}

Spendthrift.id = 'spendthrift';

module.exports = Spendthrift;
