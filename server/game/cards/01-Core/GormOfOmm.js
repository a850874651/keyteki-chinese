const Card = require('../../Card.js');

class GormOfOmm extends Card {
    // Omni: Sacrifice Gorm of Omm. Destroy an artifact.
    setupCardAbilities(ability) {
        this.omni({
            gameAction: ability.actions.sacrifice(),
            then: {
                alwaysTriggers: true,
                target: {
                    cardType: 'artifact',
                    gameAction: ability.actions.destroy()
                },
                message: '{0} 使用 {1} 摧毁 {2}'
            }
        });
    }
}

GormOfOmm.id = 'gorm-of-omm';

module.exports = GormOfOmm;
