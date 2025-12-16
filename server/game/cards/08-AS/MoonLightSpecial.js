const Card = require('../../Card.js');

class MoonLightSpecial extends Card {
    // Play: Discard a random card from your hand. If you do, gain 1A.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.discardAtRandom((context) => ({
                target: context.player
            })),
            then: {
                gameAction: ability.actions.gainAmber(),
                message: '{0} 使用 {1} 获得1琥珀'
            }
        });
    }
}

MoonLightSpecial.id = 'moon-light-special';

module.exports = MoonLightSpecial;
