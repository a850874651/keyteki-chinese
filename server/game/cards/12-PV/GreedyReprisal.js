const Card = require('../../Card.js');

class GreedyReprisal extends Card {
    // Play: For each A in your opponent's pool, destroy a creature.
    // Fate: Deal 2 to a friendly creature for each point of armor on enemy creatures.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => context.player.opponent && context.player.opponent.amber > 0,
            target: {
                mode: 'exactly',
                numCards: (context) =>
                    context.player.opponent ? context.player.opponent.amber : 0,
                cardType: 'creature',
                gameAction: ability.actions.destroy()
            }
        });

        this.fate({
            effect:
                '敌方生物每有1点护甲对1个友方生物造成2点伤害',
            gameAction: ability.actions.allocateDamage((context) => ({
                damageStep: 2,
                numSteps: context.game.activePlayer.opponent.creaturesInPlay.reduce(
                    (sum, card) => sum + card.armor,
                    0
                ),
                controller: 'opponent'
            }))
        });
    }
}

GreedyReprisal.id = 'greedy-reprisal';

module.exports = GreedyReprisal;
