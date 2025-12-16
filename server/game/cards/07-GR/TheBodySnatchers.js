const Card = require('../../Card.js');

class TheBodySnatchers extends Card {
    // Play: For the remainder of the turn, each enemy creature gains,
    // “Destroyed: Fully heal this creature and give control of it to
    // your opponent instead.”
    setupCardAbilities(ability) {
        this.play({
            effect:
                "在本回合剩余时间内给与每个敌方生物 '摧毁: 改为完全治疗本生物并将其控制权给你的对手' ",
            gameAction: ability.actions.untilPlayerTurnEnd({
                targetController: 'opponent',
                match: (card) => card.type === 'creature',
                effect: ability.effects.gainAbility('destroyed', {
                    effect: '完全治疗 {0} 并将其控制权给 {1}',
                    effectArgs: (context) => context.source.controller.opponent,
                    gameAction: [
                        ability.actions.heal({ fully: true }),
                        ability.actions.changeEvent((context) => ({
                            event: context.event,
                            cancel: true,
                            postHandler: (context) => (context.source.moribund = false)
                        })),
                        ability.actions.cardLastingEffect((context) => ({
                            duration: 'lastingEffect',
                            effect: ability.effects.takeControl(context.source.controller.opponent)
                        }))
                    ]
                })
            })
        });
    }
}

TheBodySnatchers.id = 'the-body-snatchers';

module.exports = TheBodySnatchers;
