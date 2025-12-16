const Card = require('../../Card.js');

class AssertDominance extends Card {
    // Play: For the remainder of the turn, a friendly creature gains skirmish. Ready and fight with that creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                controller: 'self',
                cardType: 'creature',
                gameAction: ability.actions.sequential([
                    ability.actions.cardLastingEffect({
                        effect: ability.effects.addKeyword({
                            skirmish: 1
                        })
                    }),
                    ability.actions.sequential([ability.actions.ready(), ability.actions.fight()])
                ]),
                effect: '给与 {0} 游击, 然后重整并使其战斗'
            }
        });
    }
}

AssertDominance.id = 'assert-dominance';

module.exports = AssertDominance;
