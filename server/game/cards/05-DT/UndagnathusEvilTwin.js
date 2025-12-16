const Card = require('../../Card.js');

class UndagnathusEvilTwin extends Card {
    // (T) While the tide is low, double all damage dealt to Undagnathus.
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onDamageApplied: (event, context) =>
                    context.source.controller.isTideLow() && event.card === context.source
            },
            effect: '对其造成的伤害翻倍',
            gameAction: ability.actions.changeEvent((context) => ({
                event: context.event,
                amount: 2 * context.event.amount
            }))
        });
    }
}

UndagnathusEvilTwin.id = 'undagnathus-evil-twin';

module.exports = UndagnathusEvilTwin;
