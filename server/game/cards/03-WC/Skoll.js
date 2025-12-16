const Card = require('../../Card.js');

class Skoll extends Card {
    // Assault 3. (Before this creature attacks, deal 3D to the attacked enemy.)
    // After an enemy creature is destroyed by Sklls assault damage, give a friendly creature a +1power counter.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardDestroyed: (event, context) =>
                    event.damageEvent &&
                    event.damageEvent.damageType === 'assault' &&
                    event.damageEvent.damageSource === context.source
            },
            target: {
                cardType: 'creature',
                controller: 'self',
                message: '{0} 使用 {1} 放置1力量指示物在 {2}上',
                messageArgs: (context) => {
                    return [context.player, context.source, context.target];
                },
                gameAction: ability.actions.addPowerCounter()
            }
        });
    }
}

Skoll.id = 'sköll';

module.exports = Skoll;
