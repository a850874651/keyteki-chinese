const Card = require('../../Card.js');

class GezdrutyoTheArcane extends Card {
    //Action: Steal 2A. Flip Gĕzdrutyŏ the Arcane facedown (it becomes a token creature).
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.sequential([
                ability.actions.steal({ amount: 2 }),
                ability.actions.flip()
            ]),
            effect: '窃取2琥珀并将 {0} 翻面'
        });
    }
}

GezdrutyoTheArcane.id = 'gĕzdrutyŏ-the-arcane';

module.exports = GezdrutyoTheArcane;
