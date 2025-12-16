const Card = require('../../Card.js');

class TalonOfInvidius extends Card {
    // Play: Exalt Talon of Invidius 3 times.
    // Destroyed: Move each A from Talon of Invidius to an enemy creature.
    setupCardAbilities(ability) {
        this.play({
            effect: '褒奖 {0} 3次',
            gameAction: [ability.actions.exalt(), ability.actions.exalt(), ability.actions.exalt()]
        });

        this.destroyed({
            condition: (context) =>
                context.player.opponent && context.player.opponent.creaturesInPlay.length > 0,
            gameAction: ability.actions.removeAmber((context) => ({
                target: context.source,
                all: true
            })),
            then: {
                gameAction: ability.actions.placeAmber((context) => ({
                    promptForSelect: {
                        cardType: 'creature',
                        controller: 'opponent',
                        message: '{0} 使用 {1} 放置 {2} 琥珀在 {3} 上',
                        messageArgs: (card) => [
                            context.player,
                            context.source.name,
                            context.preThenEvents[0].clone.amber,
                            card
                        ]
                    },
                    amount: context.preThenEvents[0].clone.amber
                }))
            }
        });
    }
}

TalonOfInvidius.id = 'talon-of-invidius';

module.exports = TalonOfInvidius;
