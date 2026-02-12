const Card = require('../../Card.js');

class MartianRevolution extends Card {
    // Play: Destroy each friendly creature. For each creature
    // destroyed this way, make a token creature.
    setupCardAbilities(ability) {
        this.play({
            effect:'摧毁每个友方生物，每有1个生物以此种方式被摧毁，制造1个代标生物',
            gameAction: ability.actions.destroy((context) => ({
                target: context.player.creaturesInPlay
            })),
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.makeTokenCreature((context) => ({
                    amount: context.preThenEvents.filter((event) => !event.cancelled).length
                }))
            }
        });
    }
}

MartianRevolution.id = 'martian-revolution';

module.exports = MartianRevolution;
