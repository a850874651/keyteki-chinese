const Card = require('../../Card.js');

class DoomDevice extends Card {
    // At the end of your turn, if there are 13 or more cards in play, destroy each creature and artifact.
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onTurnEnd: (event, context) => context.player === this.game.activePlayer
            },
            condition: (context) =>
                context.game.cardsInPlay.length +
                    context.game.cardsInPlay.reduce(
                        (acc, card) => acc + (card.upgrades?.length || 0),
                        0
                    ) >=
                13,
            gameAction: ability.actions.destroy((context) => ({
                target: context.game.cardsInPlay.filter(
                    (card) => card.type === 'creature' || card.type === 'artifact'
                )
            })),
            message: '{0} 使用 {1} 摧毁所有生物和神器',
            messageArgs: (context) => [context.player, context.source]
        });
    }
}

DoomDevice.id = 'doom-device';

module.exports = DoomDevice;
