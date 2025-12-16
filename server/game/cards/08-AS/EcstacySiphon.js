const Card = require('../../Card.js');

class EcstacySiphon extends Card {
    // Play: Deal 1D to an enemy creature for each card in your
    // opponent窶冱 hand.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            gameAction: ability.actions.allocateDamage((context) => ({
                controller: 'opponent',
                numSteps: context.player.opponent ? context.player.opponent.hand.length : 0,
                damageStep: 1
            })),
            effect: "{1}每有1张手牌对1个敌方生物造成1点伤害 ",
            effectArgs: (context) => context.player.opponent
        });
    }
}

EcstacySiphon.id = 'ecstacy-siphon';

module.exports = EcstacySiphon;
