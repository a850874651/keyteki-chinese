const Card = require('../../Card.js');

class HungryHippogriff extends Card {
    // Each other friendly creature gains, “Destroyed: Move each A
    // from this creature to your pool.”
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card, context) => card !== context.source && card.type === 'creature',
            effect: ability.effects.gainAbility('destroyed', {
                gameAction: ability.actions.removeAmber({ all: true }),
                effect: '移动所有琥珀从 {0} 到其琥珀池中',
                then: {
                    gameAction: ability.actions.gainAmber((context) => ({
                        amount: context.preThenEvent.amount
                    }))
                }
            })
        });
    }
}

HungryHippogriff.id = 'hungry-hippogriff';

module.exports = HungryHippogriff;
