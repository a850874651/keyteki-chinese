const Card = require('../../Card.js');

class SpaceInvaders extends Card {
    // Play: Reveal any number of creatures from your hand. Make each
    // creature revealed this way a token creature as if the card was
    // on top of your deck.
    setupCardAbilities(ability) {
        this.play({
            target: {
                activePromptTitle: 'Choose which cards to reveal',
                mode: 'unlimited',
                controller: 'self',
                location: 'hand',
                cardType: 'creature',
                gameAction: ability.actions.makeTokenCreature()
            },
            effect: '{1}',
            effectArgs: (context) =>
                context.target.length
                    ? `展示并作为代标 ${context.target.map((c) => c.name).join(', ')}`
                    : '没有从手牌展示生物'
        });
    }
}

SpaceInvaders.id = 'space-invaders';

module.exports = SpaceInvaders;
