const Card = require('../../Card.js');

class AllusionsOfGrandeur extends Card {
    // Play: Choose a house on your opponent's identity card. If your opponent does not choose that house as their active house on their next turn, gain 3A.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            target: {
                mode: 'house',
                houses: (context) => context.player.opponent.houses
            },
            effect: '如果 {1} 下回合没有选择 {2} 作为其当前势力，获得3琥珀',
            effectArgs: (context) => [context.player.opponent, context.house],
            effectAlert: true,
            gameAction: ability.actions.duringOpponentNextTurn((context) => ({
                targetController: 'opponent',
                when: {
                    onChooseActiveHouse: (event) =>
                        event.player !== context.player && event.house !== context.house
                },
                message: '{0} uses {1} to gain 3 amber',
                messageArgs: [context.player, context.source],
                gameAction: ability.actions.gainAmber({
                    target: context.player,
                    amount: 3
                })
            }))
        });
    }
}

AllusionsOfGrandeur.id = 'allusions-of-grandeur';

module.exports = AllusionsOfGrandeur;
