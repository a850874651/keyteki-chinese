const Card = require('../../Card.js');

class Yandylinx extends Card {
    // After Reap: Discard a card. If you do, your opponent loses 1A.
    // Scrap: Each friendly Mars creature captures 1A.
    setupCardAbilities(ability) {
        this.reap({
            target: {
                activePromptTitle: 'Choose a card to discard',
                controller: 'self',
                location: 'hand',
                gameAction: ability.actions.discard()
            },
            then: {
                message: '{0} 使用 {1} 来使 {4} 失去 {3} 琥魄',
                messageArgs: (context) => [
                    context.player.opponent.amber >= 1 ? 1 : 0,
                    context.player.opponent
                ],
                gameAction: ability.actions.loseAmber((context) => ({
                    amount: 1,
                    target: context.preThenEvent.clone.controller.opponent
                }))
            }
        });

        this.scrap({
            gameAction: ability.actions.capture((context) => ({
                target: context.player.creaturesInPlay.filter((c) => c.hasHouse('mars'))
            }))
        });
    }
}

Yandylinx.id = 'yandylinx';

module.exports = Yandylinx;
