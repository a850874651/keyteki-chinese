const Card = require('../../Card.js');

class TreokTheWise extends Card {
    // After Reap: Choose a creature. Until the start of your next turn, that creature gains invulnerable.
    setupCardAbilities(ability) {
        this.reap({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.cardLastingEffect({
                    duration: 'untilPlayerNextTurnStart',
                    effect: ability.effects.addKeyword({ invulnerable: 1 })
                })
            },
            effect: '给与 {0} 无敌效果直到你下回合开始'
        });
    }
}

TreokTheWise.id = 'treok-the-wise';

module.exports = TreokTheWise;
