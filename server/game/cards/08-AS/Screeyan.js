const Card = require('../../Card.js');

class Screeyan extends Card {
    // At the end of your turn, your opponent discards the top card of
    // their deck. Your opponent cannot choose the house of the
    // discarded card during their next “choose a house” step.
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onTurnEnd: (event, context) =>
                    context.player === this.game.activePlayer && context.player.opponent
            },
            gameAction: ability.actions.discard((context) => ({
                target: context.player.opponent ? context.player.opponent.deck[0] : []
            })),
            then: {
                gameAction: ability.actions.duringOpponentNextTurn((context) => ({
                    targetController: 'opponent',
                    effect: context.preThenEvent.card
                        .getHouses()
                        .map((h) => ability.effects.stopHouseChoice(h))
                })),
                effectAlert: true,
                message: '{0} 使用 {1} 防止 {3} 下回合宣 {4} 势力',
                messageArgs: (context) => [
                    context.player.opponent,
                    context.preThenEvent.card.getHouses()
                ]
            }
        });
    }
}

Screeyan.id = 'screeyan';

module.exports = Screeyan;
