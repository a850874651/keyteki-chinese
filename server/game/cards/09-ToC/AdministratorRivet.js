const Card = require('../../Card.js');

class AdministratorRivet extends Card {
    // Play: Make a token creature. If you are haunted, each friendly
    // token creature captures 1A.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.makeTokenCreature(),
            then: {
                alwaysTriggers: true,
                condition: (context) => context.player.isHaunted(),
                gameAction: ability.actions.capture((context) => ({
                    target: context.player.creaturesInPlay.filter((c) => c.isToken())
                })),
                message: '{0} 使用 {1} 抢占1琥珀到每个友方代标生物上'
            }
        });
    }
}

AdministratorRivet.id = 'administrator-rivet';

module.exports = AdministratorRivet;
