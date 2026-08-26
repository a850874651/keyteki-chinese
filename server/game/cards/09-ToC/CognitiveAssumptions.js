const Card = require('../../Card.js');

class CognitiveAssumptions extends Card {
    // Play: Reveal up to 3 Logos cards from your hand. For each card
    // revealed this way, make a token creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                optional: true,
                mode: 'upTo',
                numCards: 3,
                controller: 'self',
                location: 'hand',
                cardCondition: (card) => card.hasHouse('logos'),
                gameAction: ability.actions.makeTokenCreature((context) => ({
                    target: context.player.deck.slice(0, (context.target || []).length),
                    amount: (context.target || []).length
                }))
            },
            effect: '展示 {1} 并制造 {2} 个代标生物{3}',
            effectArgs: (context) => [
                context.target,
                context.target.length,
                context.target.length === 1 ? '' : ''
            ]
        });
    }
}

CognitiveAssumptions.id = 'cognitive-assumptions';

module.exports = CognitiveAssumptions;
