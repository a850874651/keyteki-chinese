const Card = require('../../Card.js');

class TheBigOne extends Card {
    // After a creature is played, put a fuse counter on The Big One.
    // If there are 10 or more fuse counters on The Big One, destroy each creature and artifact.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardPlayed: (event, context) =>
                    event.card.type === 'creature' && event.card !== context.source
            },
            gameAction: ability.actions.addFuseCounter(),
            then: {
                condition: (context) =>
                    context.source.hasToken('fuse') && context.source.tokens.fuse >= 10,
                message: '{1} 有10个爆炸指示物，摧毁所有生物和神器',
                messageArgs: (context) => [context.source],
                gameAction: ability.actions.destroy((context) => ({
                    target: context.game.cardsInPlay.filter(
                        (card) => card.type === 'artifact' || card.type === 'creature'
                    )
                }))
            }
        });
    }
}

TheBigOne.id = 'the-big-one';

module.exports = TheBigOne;
