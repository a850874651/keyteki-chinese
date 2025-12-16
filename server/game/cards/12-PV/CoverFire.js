const Card = require('../../Card.js');

class CoverFire extends Card {
    // Play: Your opponent loses half of their A (rounding down). Steal 1A.
    setupCardAbilities(ability) {
        this.play({
            effect: '使 {1} 失去其一半的琥珀并窃取1琥珀',
            effectArgs: (context) => context.player.opponent,
            gameAction: ability.actions.sequential([
                ability.actions.loseAmber((context) => ({
                    target: context.player.opponent,
                    amount: Math.floor(context.player.opponent.amber / 2)
                })),
                ability.actions.steal()
            ])
        });
    }
}

CoverFire.id = 'cover-fire';

module.exports = CoverFire;
