const Card = require('../../Card.js');

class SteadfastCommitment extends Card {
    // Play: Put the top card of your discard pile on the bottom of your deck.
    // Make a token creature.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.sequential([
                ability.actions.returnToDeck((context) => ({
                    bottom: true,
                    target: context.player.discard.slice(0, 1)
                })),
                ability.actions.makeTokenCreature()
            ]),
            effect: '将 {1} 放到其牌库底并制造1个代标生物',
            effectArgs: (context) => [
                context.player.discard.length > 0 ? context.player.discard[0] : 'nothing'
            ]
        });
    }
}

SteadfastCommitment.id = 'steadfast-commitment';

module.exports = SteadfastCommitment;
