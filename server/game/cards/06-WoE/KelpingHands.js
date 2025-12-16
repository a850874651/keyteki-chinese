const Card = require('../../Card.js');

class KelpingHands extends Card {
    //Omni: Destroy Kelping Hands. For the remainder of the turn, each friendly creature gains poison.
    setupCardAbilities(ability) {
        this.omni({
            gameAction: ability.actions.sequential([
                ability.actions.destroy((context) => ({
                    target: context.source
                })),
                ability.actions.untilPlayerTurnEnd({
                    match: (card) => card.type === 'creature',
                    effect: ability.effects.addKeyword({
                        poison: 1
                    })
                })
            ]),
            effect:
                '摧毁 {0}. 在本回合的剩余时间内，每个友方生物具有剧毒',
            effectAlert: true
        });
    }
}

KelpingHands.id = 'kelping-hands';

module.exports = KelpingHands;
