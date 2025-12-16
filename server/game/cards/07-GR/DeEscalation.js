const Card = require('../../Card.js');

class DeEscalation extends Card {
    // Play: Destroy each creature. Your opponent archives the top 3
    // cards of their deck.
    setupCardAbilities(ability) {
        this.play({
            effect: '摧毁所有生物{1}',
            effectArgs: (context) => [
                context.player.opponent
                    ? ' 并使得 ' +
                      context.player.opponent.name +
                      ' 归档其牌库顶的3张牌'
                    : ''
            ],
            gameAction: ability.actions.sequential([
                ability.actions.destroy((context) => ({ target: context.game.creaturesInPlay })),
                ability.actions.archive((context) => ({
                    target: context.player.opponent ? context.player.opponent.deck.slice(0, 3) : []
                }))
            ])
        });
    }
}

DeEscalation.id = 'de-escalation';

module.exports = DeEscalation;
