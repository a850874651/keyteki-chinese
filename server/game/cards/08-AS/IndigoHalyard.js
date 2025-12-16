const Card = require('../../Card.js');

class IndigoHalyard extends Card {
    // While your blue key is forged, Indigo Halyard gains, 窶廣fter
    // Reap: Ready and fight with another friendly creature.窶�
    // While your opponent窶冱 blue key is forged, each of Indigo
    // Halyard窶冱 neighbors gains taunt.
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card, context) => card === context.source && card.controller.keys.blue,
            effect: ability.effects.gainAbility('reap', {
                effect: '重整并使 {1} 战斗',
                effectArgs: (context) => [context.target],
                target: {
                    cardType: 'creature',
                    controller: 'self',
                    cardCondition: (card, context) => context.source !== card,
                    gameAction: ability.actions.sequential([
                        ability.actions.ready(),
                        ability.actions.fight()
                    ])
                }
            })
        });

        this.persistentEffect({
            match: (card, context) =>
                context.source.neighbors.includes(card) &&
                card.controller.opponent &&
                card.controller.opponent.keys.blue,
            effect: ability.effects.addKeyword({ taunt: 1 })
        });
    }
}

IndigoHalyard.id = 'indigo-halyard';

module.exports = IndigoHalyard;
