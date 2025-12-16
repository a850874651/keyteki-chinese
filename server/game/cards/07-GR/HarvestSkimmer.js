const Card = require('../../Card.js');

class HarvestSkimmer extends Card {
    // After Reap: Discard the top card of your deck. If it is a
    // creature, gain 1 A.
    setupCardAbilities(ability) {
        this.reap({
            gameAction: ability.actions.discard((context) => ({
                target: context.player.deck.slice(0, 1)
            })),
            then: {
                condition: (context) => context.preThenEvent.card.type === 'creature',
                gameAction: ability.actions.gainAmber(),
                message: '{0} 使用 {1} 获得1琥珀'
            }
        });
    }
}

HarvestSkimmer.id = 'harvest-skimmer';

module.exports = HarvestSkimmer;
