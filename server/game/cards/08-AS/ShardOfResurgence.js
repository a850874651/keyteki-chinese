const Card = require('../../Card.js');

class ShardOfResurgence extends Card {
    // Action: Archive a card from your discard pile for each friendly Shard.
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.sequentialForEach((context) => ({
                num:
                    1 +
                    context.player.cardsInPlay.filter(
                        (card) => card !== context.source && card.hasTrait('shard')
                    ).length,
                action: ability.actions.archive({
                    promptForSelect: {
                        activePromptTitle: 'Choose a card to archive',
                        controller: 'self',
                        location: 'discard',
                        message: '{0} 使用 {1} 归档 {2}',
                        messageArgs: (cards) => [context.player, context.source, cards]
                    }
                })
            })),
            effect: '每有1个友方碎片从弃牌堆归档1张卡牌'
        });
    }
}

ShardOfResurgence.id = 'shard-of-resurgence';

module.exports = ShardOfResurgence;
