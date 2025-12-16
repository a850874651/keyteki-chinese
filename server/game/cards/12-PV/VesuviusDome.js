const Card = require('../../Card.js');

class VesuviusDome extends Card {
    // Action: Move each A from each creature to the common supply. Destroy each creature. Destroy Vesuvius Dome.
    setupCardAbilities(ability) {
        this.action({
            effect:
                '将所有生物上的琥珀移动到公共供应堆，摧毁所有生物，摧毁它自己',
            gameAction: ability.actions.sequential([
                ability.actions.removeAmber((context) => ({
                    all: true,
                    target: context.game.creaturesInPlay
                })),
                ability.actions.destroy((context) => ({
                    target: context.game.creaturesInPlay
                })),
                ability.actions.destroy()
            ])
        });
    }
}

VesuviusDome.id = 'vesuvius-dome';

module.exports = VesuviusDome;
