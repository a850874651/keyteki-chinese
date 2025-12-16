const Card = require('../../Card.js');

class Rockatiel extends Card {
    // Play/After Reap: Choose up to 2 creatures. Shuffle each chosen
    // creature into its owner窶冱 deck.
    setupCardAbilities(ability) {
        this.play({
            reap: true,
            target: {
                numCards: 2,
                mode: 'upTo',
                cardType: 'creature',
                controller: 'any',
                gameAction: ability.actions.returnToDeck({ shuffle: true })
            },
            effect: "将 {1} 洗回其所有者的牌库",
            effectArgs: (context) => [context.target]
        });
    }
}

Rockatiel.id = 'rockatiel';

module.exports = Rockatiel;
