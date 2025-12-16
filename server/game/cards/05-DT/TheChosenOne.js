const Card = require('../../Card.js');

class TheChosenOne extends Card {
    // Instead of readying creatures they control during their “ready cards” step, your opponent deals 1D to The Chosen One for each exhausted creature they control.
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onCardsReadied: (event, context) => event.player === context.player.opponent
            },
            gameAction: [
                ability.actions.changeEvent((context) => ({
                    event: context.event,
                    cards: context.event.cards.filter((card) => card.type !== 'creature')
                })),
                ability.actions.dealDamage((context) => ({
                    amount: context.player.opponent.creaturesInPlay.filter((card) => card.exhausted)
                        .length
                }))
            ],
            effect: ' {1} 无法重整其生物，造成 {2} 点伤害对 {0}',
            effectArgs: (context) => [
                context.player.opponent,
                context.player.opponent.creaturesInPlay.filter((card) => card.exhausted).length
            ]
        });
    }
}

TheChosenOne.id = 'the-chosen-one';

module.exports = TheChosenOne;
