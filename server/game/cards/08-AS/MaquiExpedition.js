const Card = require('../../Card.js');

class MaquiExpedition extends Card {
    // Play: Gain control of an enemy flank creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'opponent',
                cardCondition: (card) => card.isOnFlank(),
                gameAction: ability.actions.cardLastingEffect((context) => ({
                    duration: 'lastingEffect',
                    effect: ability.effects.takeControl(context.player)
                }))
            },
            effect: '获得 {1} 的控制权',
            effectArgs: (context) => [context.target]
        });
    }
}

MaquiExpedition.id = 'maqui-expedition';

module.exports = MaquiExpedition;
