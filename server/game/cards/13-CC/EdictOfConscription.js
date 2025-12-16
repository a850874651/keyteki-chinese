const Card = require('../../Card.js');

class EdictOfConscription extends Card {
    // Action: Destroy Edict of Conscription. For the remainder of the turn, each friendly creature belongs to house Saurian.
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.destroy((context) => ({
                target: context.source
            })),
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.cardLastingEffect((context) => ({
                    effect: ability.effects.changeHouse('saurian'),
                    target: context.player.creaturesInPlay
                })),
                effect:
                    '在本回合剩余时间内，使每个友方生物都属于蜥族势力'
            }
        });
    }
}

EdictOfConscription.id = 'edict-of-conscription';

module.exports = EdictOfConscription;
