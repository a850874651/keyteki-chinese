const Card = require('../../Card.js');

class DrivingCourage extends Card {
    // Play: Ready and use a friendly Mutant creature.
    // Fate: Exhaust each friendly non-Mutant creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card) => card.hasTrait('mutant'),
                gameAction: ability.actions.sequential([
                    ability.actions.ready(),
                    ability.actions.use()
                ])
            },
            effect: '重整并使用 {0}'
        });

        this.fate({
            gameAction: ability.actions.exhaust((context) => ({
                target: context.game.activePlayer.creaturesInPlay.filter(
                    (card) => !card.hasTrait('mutant')
                )
            })),
            effect: '横置每个友方非变异体生物'
        });
    }
}

DrivingCourage.id = 'driving-courage';

module.exports = DrivingCourage;
