const Card = require('../../Card.js');

class Suspendamander extends Card {
    // After Fight: Choose a house. Your opponent cannot play action
    // cards of that house during their next turn.
    setupCardAbilities(ability) {
        this.fight({
            target: {
                mode: 'house'
            },
            effect: '使得 {1} 下回合无法打出 {2} 势力的行动牌',
            effectArgs: (context) => [context.player.opponent, context.house],
            effectAlert: true,
            gameAction: ability.actions.duringOpponentNextTurn((context) => ({
                targetController: 'opponent',
                effect: ability.effects.playerCannot(
                    'play',
                    (innerContext) =>
                        innerContext.source.type === 'action' &&
                        innerContext.source.hasHouse(context.house)
                )
            }))
        });
    }
}

Suspendamander.id = 'suspendamander';

module.exports = Suspendamander;
