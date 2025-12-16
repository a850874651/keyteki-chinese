const Card = require('../../Card.js');

class CulturalExchange extends Card {
    // Play: Your opponent puts each card from their archives into their hand.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) =>
                !!context.player.opponent && context.player.opponent.archives.length > 0,
            effect: "将 {1}的档案中的每张牌返回到其手中",
            effectArgs: (context) => [context.player.opponent],
            gameAction: ability.actions.sequentialForEach((context) => ({
                forEach: context.player.opponent.archives,
                action: ability.actions.returnToHand({
                    location: ['archives']
                })
            }))
        });
    }
}

CulturalExchange.id = 'cultural-exchange';

module.exports = CulturalExchange;
