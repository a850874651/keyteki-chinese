const Card = require('../../Card.js');

class IyxrenuTheClever extends Card {
    // Action: Lose 1A. If you do, move all A from a creature to your pool.
    setupCardAbilities(ability) {
        this.action({
            message: '{0} 使用 {1} 失去 {2} 琥珀',
            messageArgs: (context) => [
                context.player,
                context.source,
                Math.min(1, context.player.amber)
            ],
            gameAction: ability.actions.loseAmber((context) => ({
                target: context.player
            })),
            then: {
                message: '{0} 使用 {1} 把所有 {3} 琥珀从 {2} 移至琥珀池',
                messageArgs: (context) => [context.target.amber],
                target: {
                    cardType: 'creature',
                    gameAction: ability.actions.returnAmber((context) => ({
                        all: true,
                        recipient: context.player
                    }))
                }
            }
        });
    }
}

IyxrenuTheClever.id = 'iyxrenu-the-clever';

module.exports = IyxrenuTheClever;
