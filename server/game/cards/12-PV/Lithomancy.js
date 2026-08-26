const Card = require('../../Card.js');

class Lithomancy extends Card {
    // Action: Reveal the top card of your deck. If the revealed card belongs to the active house, discard it and gain 2 amber.
    setupCardAbilities(ability) {
        this.action({
            effect: '展示了 {1}',
            condition: (context) => context.player.deck.length > 0,
            effectArgs: (context) => context.player.deck[0],
            gameAction: ability.actions.reveal((context) => ({
                target: context.player.deck.length > 0 ? context.player.deck[0] : [],
                chatMessage: false
            })),
            then: {
                alwaysTriggers: true,
                condition: (context) =>
                    context.player.deck.length > 0 &&
                    context.player.deck[0].hasHouse(context.player.activeHouse),
                gameAction: [
                    ability.actions.discard((context) => ({
                        target: context.player.deck[0],
                        chatMessage: false
                    })),
                    ability.actions.gainAmber({ amount: 2 })
                ],
                message: '{0} 使用 {1} 弃掉 {3} 并获得2琥珀',
                messageArgs: (context) => [
                    context.player.deck.length > 0 ? context.player.deck[0] : 'nothing'
                ]
            }
        });
    }
}

Lithomancy.id = 'lithomancy';

module.exports = Lithomancy;
