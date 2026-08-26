const Card = require('../../Card.js');

class Befuddle extends Card {
    //Play: Choose a house on your opponent's identity card. During their next turn, they cannot play cards of other houses.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            target: {
                mode: 'house',
                houses: (context) => context.player.opponent.houses
            },
            effect: '{1} 无法打出 {2} 势力以外的卡牌',
            effectArgs: (context) => [context.player.opponent, context.house],
            effectAlert: true,
            gameAction: ability.actions.duringOpponentNextTurn((context) => ({
                targetController: 'opponent',
                effect: ability.effects.playerCannot('play', (sourceContext) =>
                    sourceContext.source.hasHouseThatIsNot(context.house)
                )
            }))
        });
    }
}

Befuddle.id = 'befuddle';

module.exports = Befuddle;
