const Card = require('../../Card.js');

class ZeffPunchYardus extends Card {
    // After Reap: Archive the top card of your deck and the top card of your discard pile.
    setupCardAbilities(ability) {
        this.reap({
            effect: '归档了牌库顶的牌{1}{2}',
            effectArgs: (context) => [
                context.player.discard.length > 0 ? ' 与 ' : '',
                context.player.discard.length > 0 ? context.player.discard[0] : ''
            ],
            gameAction: [
                ability.actions.archive((context) => ({
                    target: context.player.deck[0]
                })),
                ability.actions.archive((context) => ({
                    target:
                        context.player.discard.length > 0 ? context.player.discard[0] : undefined
                }))
            ]
        });
    }
}

ZeffPunchYardus.id = 'zeff-punch-yardus';

module.exports = ZeffPunchYardus;
