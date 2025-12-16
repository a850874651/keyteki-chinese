const Card = require('../../Card.js');

class AllHandsOnDeck extends Card {
    // Play: If you are haunted, destroy a creature. Otherwise, deal
    // 3D to a creature.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.conditional({
                condition: (context) => context.player.isHaunted(),
                trueGameAction: ability.actions.destroy((context) => ({
                    promptForSelect: {
                        cardType: 'creature',
                        message: '{0} 使用 {1} 摧毁 {2}',
                        messageArgs: (cards) => [context.player, context.source.name, cards]
                    }
                })),
                falseGameAction: ability.actions.dealDamage((context) => ({
                    amount: 3,
                    promptForSelect: {
                        cardType: 'creature',
                        message: '{0} 使用 {1} 造成3点伤害对 {2}',
                        messageArgs: (cards) => [context.player, context.source.name, cards]
                    }
                }))
            }),
            effect: '{1}',
            effectArgs: (context) => [
                context.player.isHaunted() ? '摧毁1个生物' : '对1个生物造成3点伤害'
            ]
        });
    }
}

AllHandsOnDeck.id = 'all-hands-on-deck';

module.exports = AllHandsOnDeck;
