const Card = require('../../Card.js');

class UnityPrism extends Card {
    // Alpha.
    // Play: For the remainder of the turn, you may play cards from any house.
    // You cannot play more than 4 cards this turn (including this one).
    // Scrap: Reveal your hand. Gain 1 amber for each house represented in it.
    setupCardAbilities(ability) {
        this.play({
            effect: '本回合允许打出任意势力的4张牌',
            gameAction: ability.actions.untilPlayerTurnEnd({
                effect: [
                    ability.effects.canPlay((context) => {
                        return context.game.cardsPlayedThisPhase.length < 4;
                    }),
                    ability.effects.playerCannot('play', (context) => {
                        return context.game.cardsPlayedThisPhase.length >= 4;
                    })
                ]
            })
        });

        this.scrap({
            effect:
                '展示了其手牌 ({1}) 并根据每个展示的势力获得1琥珀, 一共获得了 {2} 琥珀',
            effectArgs: (context) => [
                context.player.hand,
                context.player.hand.reduce((houses, card) => {
                    if (!houses.includes(card.printedHouse)) {
                        houses.push(card.printedHouse);
                    }
                    return houses;
                }, []).length
            ],
            gameAction: ability.actions.gainAmber((context) => ({
                amount: context.game.getHousesInPlay(context.player.hand).length
            }))
        });
    }
}

UnityPrism.id = 'unity-prism';

module.exports = UnityPrism;
