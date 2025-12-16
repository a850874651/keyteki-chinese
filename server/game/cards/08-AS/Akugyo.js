const Card = require('../../Card.js');

class Akugyo extends Card {
    // Each A that would be added to your opponent窶冱 pool is captured
    // by Akugyo instead.
    // After Fight: Move 2A from Akugyo to your pool.
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onModifyAmber: (event, context) =>
                    event.player === context.player.opponent && !event.loseAmber
            },
            gameAction: ability.actions.sequential([
                ability.actions.placeAmber((context) => ({
                    target: context.source,
                    amount: context.event.amount
                })),
                ability.actions.changeEvent((context) => ({
                    event: context.event,
                    amount: 0
                }))
            ]),
            effect: "抢占琥珀替代了琥珀进池"
        });

        this.fight({
            condition: (context) => context.source.amber > 0,
            effect: '移动 {1} 琥珀从 {0} 到其琥珀池中',
            effectArgs: (context) => [context.source.amber > 1 ? 2 : context.source.amber],
            gameAction: ability.actions.removeAmber({ amount: 2 }),
            then: {
                gameAction: ability.actions.gainAmber((context) => ({
                    amount: context.preThenEvent.amount
                }))
            }
        });
    }
}

Akugyo.id = 'akugyo';

module.exports = Akugyo;
