const Card = require('../../Card.js');

class Platopelta extends Card {
    // After Reap: If Platopelta has a wisdom counter, draw 1 card,
    // archive 1 card, and you may put a wisdom counter on
    // Aristotlmimus. Otherwise, archive 1 card.
    setupCardAbilities(ability) {
        this.reap({
            effect: '{1}',
            effectArgs: () => [
                this.hasToken('wisdom')
                    ? '抽1张牌，归档1张牌，并可以把1个智慧指示物放在亚里士多德似龙上'
                    : '归档1张牌'
            ],
            gameAction: ability.actions.conditional((context) => ({
                condition: context.source.hasToken('wisdom'),
                trueGameAction: ability.actions.draw()
            })),
            then: {
                alwaysTriggers: true,
                target: {
                    location: 'hand',
                    controller: 'self',
                    gameAction: ability.actions.archive()
                },
                then: {
                    alwaysTriggers: true,
                    target: {
                        cardCondition: (card, context) =>
                            context.source.hasToken('wisdom') && card.name === 'Aristotlmimus',
                        optional: true,
                        location: 'play area',
                        controller: 'any',
                        numCards: 1,
                        gameAction: ability.actions.addWisdomCounter()
                    }
                }
            }
        });
    }
}

Platopelta.id = 'platopelta';

module.exports = Platopelta;
