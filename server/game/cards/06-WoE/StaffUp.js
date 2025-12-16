const Card = require('../../Card.js');

class StaffUp extends Card {
    // Play: For the remainder of the turn. when any amount of Aember
    // would be added to your pool, make that many token creatures instead.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.untilPlayerTurnEnd({
                when: {
                    onModifyAmber: (event, context) =>
                        event.player === context.player && event.amount > 0 && !event.loseAmber
                },
                triggeredAbilityType: 'interrupt',
                gameAction: ability.actions.sequential([
                    ability.actions.makeTokenCreature((context) => ({
                        amount: context.event.amount
                    })),
                    ability.actions.changeEvent((context) => ({
                        event: context.event,
                        amount: 0
                    }))
                ]),
                message: '{0} 使用 {1} 制造 {2} 个代标生物{3}',
                messageArgs: (context) => [
                    context.player,
                    context.source,
                    context.event.amount,
                    context.event.amount !== 1 ? '' : ''
                ]
            }),
            effect:
                '在本回合剩余时间内，每当有任意数量的琥珀将要加入到你的琥珀池中时，制造1个代标生物'
        });
    }
}

StaffUp.id = 'staff-up';

module.exports = StaffUp;
