const Card = require('../../Card.js');

class RiggedLottery extends Card {
    // Play: Each player discards the top 5cards of their deck. For each Shadows card discarded, its owner gains 1A.
    setupCardAbilities(ability) {
        this.play({
            gameAction: [
                ability.actions.discard((context) => ({
                    target:
                        context.player.deck.length > 0
                            ? context.player.deck.slice(0, Math.min(5, context.player.deck.length))
                            : []
                })),
                ability.actions.discard((context) => ({
                    target:
                        context.player.opponent && context.player.opponent.deck.length > 0
                            ? context.player.opponent.deck.slice(
                                  0,
                                  Math.min(5, context.player.opponent.deck.length)
                              )
                            : []
                }))
            ],
            then: (preThenContext) => {
                let myCards =
                    preThenContext.player.deck.length > 0
                        ? preThenContext.player.deck.slice(
                              0,
                              Math.min(5, preThenContext.player.deck.length)
                          )
                        : [];
                let theirCards =
                    preThenContext.player.opponent && preThenContext.player.opponent.deck.length > 0
                        ? preThenContext.player.opponent.deck.slice(
                              0,
                              Math.min(5, preThenContext.player.opponent.deck.length)
                          )
                        : [];
                return {
                    message:
                        "{0} 弃掉了 {3} 从 {4}的牌库, 并且 {4} 获得了 {5} 琥珀. 他还弃掉了 {6} 从 {7}的牌库，并且 {7} 获得了 {8} 琥珀",
                    messageArgs: [
                        myCards,
                        preThenContext.player,
                        myCards.filter((card) => card.hasHouse('shadows')).length,
                        theirCards,
                        preThenContext.player.opponent,
                        theirCards.filter((card) => card.hasHouse('shadows')).length
                    ],
                    gameAction: [
                        ability.actions.gainAmber({
                            amount: myCards.filter((card) => card.hasHouse('shadows')).length,
                            target: preThenContext.player
                        }),
                        ...(preThenContext.player.opponent
                            ? [
                                  ability.actions.gainAmber({
                                      amount: theirCards.filter((card) => card.hasHouse('shadows'))
                                          .length,
                                      target: preThenContext.player.opponent
                                  })
                              ]
                            : [])
                    ]
                };
            }
        });
    }
}

RiggedLottery.id = 'rigged-lottery';

module.exports = RiggedLottery;
