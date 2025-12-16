const Card = require('../../Card.js');

class CacophonousRiot extends Card {
    // Play: Ready and enrage a creature and each of its neighbors.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.sequential([
                    ability.actions.ready((context) => ({
                        target: context.target.neighbors.concat(context.target)
                    })),
                    ability.actions.enrage((context) => ({
                        target: context.target.neighbors.concat(context.target)
                    }))
                ])
            },
            effect: '重整并激怒 {1}',
            effectArgs: (context) => [context.target.neighbors.concat(context.target)]
        });
    }
}

CacophonousRiot.id = 'cacophonous-riot';

module.exports = CacophonousRiot;
