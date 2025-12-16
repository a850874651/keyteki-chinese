const Card = require('../../Card.js');

class RoutineJob extends Card {
    // Play: Steal 1A. Then, steal 1A for each copy of Routine Job in your discard pile.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.steal(),
            then: (context) => ({
                message: '{0} 窃取了额外的 {3} 琥珀通过 {1}',
                messageArgs: [
                    context.player.discard.filter((card) => card.name === 'Routine Job').length
                ],
                gameAction: ability.actions.steal({
                    amount: context.player.discard.filter((card) => card.name === 'Routine Job')
                        .length
                })
            })
        });
    }
}

RoutineJob.id = 'routine-job';

module.exports = RoutineJob;
