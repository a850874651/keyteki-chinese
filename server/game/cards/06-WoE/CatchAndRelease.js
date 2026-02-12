const Card = require('../../Card.js');

class CatchAndRelease extends Card {
    // Play: Return each creature to its owner`s hand. Each player
    // discards random cards from their hand until they have 6 or
    // fewer cards in hand. Gain 2 chains.
    setupCardAbilities(ability) {
        this.play({
            effect: "将所有生物返回其所有者手中，每位玩家随机弃牌直到手牌数少于6",
            gameAction: [
                ability.actions.returnToHand((context) => ({
                    target: context.game.creaturesInPlay
                })),
                ability.actions.gainChains({ amount: 2 })
            ],
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.discardRandomCardsToAmount((context) => ({
                    amount: 6,
                    target: [context.player, context.player.opponent]
                }))
            }
        });
    }
}

CatchAndRelease.id = 'catch-and-release';

module.exports = CatchAndRelease;
