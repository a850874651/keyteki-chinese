const Card = require('../../Card.js');

class Sidekick extends Card {
    // Play: Choose a card in your hand and put it into play as a token creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                controller: 'self',
                location: 'hand',
                gameAction: ability.actions.makeTokenCreature()
            },
            effect: '将1张牌从手牌中放置入场作为代标生物'
        });
    }
}

Sidekick.id = 'sidekick';

module.exports = Sidekick;
