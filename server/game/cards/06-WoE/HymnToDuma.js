const Card = require('../../Card.js');

class HymnToDuma extends Card {
    //Each friendly creature gains, "Omni: Destroy this creature. A friendly creature captures 2A."
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) => card.type === 'creature',
            effect: ability.effects.gainAbility('omni', {
                gameAction: ability.actions.destroy((context) => ({
                    target: context.source
                })),
                then: {
                    alwaysTriggers: true,
                    target: {
                        cardType: 'creature',
                        controller: 'self',
                        gameAction: ability.actions.capture({ amount: 2 })
                    },
                    message: '{0} 使用 {3} 来抢占 {4} 琥魄, 放置在 {2}',
                    messageArgs: (context) => [
                        this,
                        context.player.opponent.amber >= 2 ? 2 : context.player.opponent.amber
                    ]
                }
            })
        });
    }
}

HymnToDuma.id = 'hymn-to-duma';

module.exports = HymnToDuma;
