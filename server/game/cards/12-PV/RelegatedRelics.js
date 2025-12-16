const Card = require('../../Card.js');

class RelegatedRelics extends Card {
    // Play: Shuffle each artifact into its owner's deck.
    // Fate: Purge each artifact.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.returnToDeck((context) => ({
                shuffle: true,
                target: context.game.cardsInPlay.filter((card) => card.type === 'artifact')
            }))
        });

        this.fate({
            effect: '清除每个神器',
            gameAction: ability.actions.purge((context) => ({
                target: context.game.cardsInPlay.filter((card) => card.type === 'artifact')
            }))
        });
    }
}

RelegatedRelics.id = 'relegated-relics';

module.exports = RelegatedRelics;
