const Card = require('../../Card.js');

class UniversalWelcome extends Card {
    // Play: Take control of the enemy creature in the center of your
    // opponent窶冱 battleline.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            gameAction: ability.actions.cardLastingEffect((context) => ({
                duration: 'lastingEffect',
                effect: ability.effects.takeControl(context.player),
                target: context.player.opponent.creaturesInPlay.filter((c) => c.isInCenter())
            })),
            effect: '获得 {1} 的控制权',
            effectArgs: (context) =>
                context.player.opponent.creaturesInPlay.filter((c) => c.isInCenter())
        });
    }
}

UniversalWelcome.id = 'universal-welcome';

module.exports = UniversalWelcome;
