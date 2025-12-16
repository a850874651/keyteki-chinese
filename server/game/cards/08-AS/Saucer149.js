const Card = require('../../Card.js');

class Saucer149 extends Card {
    // Play: Exalt Saucer 149 four times.
    // Action: Move 2A from Saucer 149 to an enemy creature.
    setupCardAbilities(ability) {
        this.play({
            effect: '褒奖 {0} 4次',
            gameAction: [
                ability.actions.exalt(),
                ability.actions.exalt(),
                ability.actions.exalt(),
                ability.actions.exalt()
            ]
        });

        this.action({
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.removeAmber((context) => ({
                    target: context.source,
                    amount: context.source.amber > 1 ? 2 : context.source.amber
                }))
            },
            effect: '移动 {1} 琥珀从 {2} 到 {0}',
            effectArgs: (context) => [
                context.source.amber > 1 ? 2 : context.source.amber,
                context.source
            ],
            then: (preThenContext) => ({
                gameAction: ability.actions.placeAmber((context) => ({
                    amount: context.preThenEvent.amount,
                    target: preThenContext.target
                }))
            })
        });
    }
}

Saucer149.id = 'saucer-149';

module.exports = Saucer149;
