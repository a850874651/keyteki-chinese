const Card = require('../../Card.js');

class HallowedEveFestival extends Card {
    // Play: Discard the top 5 cards of your deck. For each Geistoid
    // card discarded this way, a friendly creature captures 1 A.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.discard((context) => ({
                target: context.player.deck.slice(0, 5)
            })),
            then: {
                message: '{0} 使用 {1} 抢占 {3} 琥珀放置到友方生物上',
                messageArgs: (context) => [
                    context.preThenEvents.filter(
                        (event) => !!event.card && event.card.hasHouse('geistoid')
                    ).length
                ],
                gameAction: ability.actions.sequentialForEach((context) => ({
                    num: context.preThenEvents.filter(
                        (event) => !!event.card && event.card.hasHouse('geistoid')
                    ).length,
                    action: ability.actions.capture({
                        promptForSelect: {
                            activePromptTitle: 'Choose a creature to capture 1 amber',
                            cardType: 'creature',
                            controller: 'self'
                        }
                    })
                }))
            }
        });
    }
}

HallowedEveFestival.id = 'hallowed-eve-festival';

module.exports = HallowedEveFestival;
