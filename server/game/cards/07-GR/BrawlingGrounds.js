const Card = require('../../Card.js');

class BrawlingGrounds extends Card {
    // Omni: For the remainder of the turn, each time a creature is
    // destroyed in a fight, its controller discards a random card
    // from their hand.
    setupCardAbilities(ability) {
        this.omni({
            effect:
                '在本回合剩余时间内，每有1个生物在战斗中被摧毁，其控制者随机弃掉1张手牌',
            gameAction: ability.actions.untilPlayerTurnEnd({
                when: {
                    onCardDestroyed: (event) =>
                        event.clone.type === 'creature' &&
                        !!event.damageEvent &&
                        !!event.damageEvent.fightEvent
                },
                gameAction: ability.actions.discardAtRandom((context) => ({
                    target: context.event.clone.controller
                }))
            })
        });
    }
}

BrawlingGrounds.id = 'brawling-grounds';

module.exports = BrawlingGrounds;
