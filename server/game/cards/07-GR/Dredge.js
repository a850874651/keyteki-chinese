const Card = require('../../Card.js');

class Dredge extends Card {
    // Play: For the remainder of the turn, each friendly creature
    // gains: "After Reap: Return a card from your discard pile to the
    // top of your deck."
    setupCardAbilities(ability) {
        this.play({
            effect:
                "在本回合剩余时间内每个友方生物获得 '收货后: 将你弃牌堆中的1张牌返回到你的牌库顶'",
            gameAction: ability.actions.untilPlayerTurnEnd({
                match: (card) => card.type === 'creature',
                effect: ability.effects.gainAbility('reap', {
                    target: {
                        controller: 'self',
                        location: 'discard',
                        gameAction: ability.actions.returnToDeck()
                    }
                })
            })
        });
    }
}

Dredge.id = 'dredge';

module.exports = Dredge;
