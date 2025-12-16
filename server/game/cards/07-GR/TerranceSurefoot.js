const Card = require('../../Card.js');

class TerranceSurefoot extends Card {
    // After an enemy creature reaps, move 1A from Terrance Surefoot
    // to the common supply.
    // Play/After Reap: Capture 1A.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onReap: (event, context) =>
                    event.card.type === 'creature' &&
                    event.card.controller !== context.source.controller
            },
            effect: '移动 1 琥珀从 {0} 到公共供应堆',
            gameAction: ability.actions.removeAmber({
                amount: 1
            })
        });

        this.play({
            reap: true,
            gameAction: ability.actions.capture()
        });
    }
}

TerranceSurefoot.id = 'terrance-surefoot';

module.exports = TerranceSurefoot;
