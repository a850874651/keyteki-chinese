const Card = require('../../Card.js');

class EmpathicMalice extends Card {
    // Play: A friendly creature captures 3. If you are haunted, put
    // Empathic Malice on the bottom of your deck.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.capture({ amount: 3 })
            },
            then: {
                alwaysTriggers: true,
                condition: (context) => context.player.isHaunted(),
                message: '{0} 使用 {1} 将 {1} 放到其牌库底',
                gameAction: ability.actions.returnToDeck((context) => ({
                    target: context.source,
                    bottom: true
                }))
            }
        });
    }
}

EmpathicMalice.id = 'empathic-malice';

module.exports = EmpathicMalice;
