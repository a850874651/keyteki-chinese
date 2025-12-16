const Card = require('../../Card.js');

class WellOfMemory extends Card {
    // Play: Purge any number of cards from your hand. For each card
    // purged this way, return a card from your discard pile to your
    // hand.
    //
    // Action: Destroy Well of Memory.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'unlimited',
                controller: 'self',
                location: 'hand',
                gameAction: ability.actions.purge()
            },
            then: (preThenContext) => ({
                target: {
                    numCards: preThenContext.target.length,
                    location: 'discard',
                    controller: 'self',
                    gameAction: ability.actions.returnToHand({
                        location: 'discard'
                    })
                },
                message: '{0} 使用 {1} 将 {3} 返回其手中',
                messageArgs: (context) => [context.target]
            })
        });

        this.action({
            gameAction: ability.actions.destroy((context) => ({
                target: context.source
            }))
        });
    }
}

WellOfMemory.id = 'well-of-memory';

module.exports = WellOfMemory;
