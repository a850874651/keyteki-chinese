const Card = require('../../Card.js');

class TillTheEarth extends Card {
    // Play: Each player shuffles their discard pile into their deck.
    setupCardAbilities(ability) {
        this.play({
            effect: '使每位玩家将其弃牌堆洗回牌库',
            gameAction: [
                ability.actions.returnToDeck((context) => ({
                    shuffle: true,
                    shuffleDiscardIntoDeck: true,
                    target: context.player.discard
                })),
                ability.actions.conditional((context) => ({
                    condition: !!context.player.opponent,
                    trueGameAction: ability.actions.returnToDeck((context) => ({
                        shuffle: true,
                        shufflePlayer: context.player.opponent,
                        target: context.player.opponent ? context.player.opponent.discard : []
                    }))
                }))
            ]
        });
    }
}

TillTheEarth.id = 'till-the-earth';

module.exports = TillTheEarth;
