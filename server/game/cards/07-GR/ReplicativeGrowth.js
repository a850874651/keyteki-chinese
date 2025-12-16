const Card = require('../../Card.js');

class ReplicativeGrowth extends Card {
    // Play: For the remainder of the turn, each friendly creature gains,
    //
    // “After Reap: Move 1 from this creature to your pool.”
    setupCardAbilities(ability) {
        this.play({
            effect:
                "在本回合剩余时间内给与每个友方生物 '收货后: 移动1琥珀从本生物到你的琥珀池中'",
            gameAction: ability.actions.untilPlayerTurnEnd({
                match: (card) => card.type === 'creature',
                effect: ability.effects.gainAbility('reap', {
                    gameAction: ability.actions.removeAmber(),
                    effect: '移动1琥珀从 {0} 到其琥珀池中',
                    then: {
                        gameAction: ability.actions.gainAmber()
                    }
                })
            })
        });
    }
}

ReplicativeGrowth.id = 'replicative-growth';

module.exports = ReplicativeGrowth;
