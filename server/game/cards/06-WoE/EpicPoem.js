const Card = require('../../Card.js');
class EpicPoem extends Card {
    // Play: Exalt a friendly creature. Gain 1 amber for each  on that creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                optional: false,
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.sequential([
                    ability.actions.exalt(),
                    ability.actions.gainAmber((context) => ({
                        amount: context.target.amber,
                        target: context.player
                    }))
                ])
            },
            effect: '褒奖 {0} 并获得 {1} 琥珀',
            effectArgs: (context) => [context.target.amber + 1]
        });
    }
}

EpicPoem.id = 'epic-poem';
module.exports = EpicPoem;
