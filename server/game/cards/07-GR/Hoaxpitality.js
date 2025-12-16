const Card = require('../../Card.js');

class Hoaxpitality extends Card {
    // Play: Choose an enemy creature and a friendly creature. Until
    // the end of the turn, the friendly creature窶冱 power is equal to
    // the enemy creature's power.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) =>
                context.player.creaturesInPlay.length > 0 &&
                context.player.opponent &&
                context.player.opponent.creaturesInPlay.length > 0,
            targets: {
                friendly: {
                    cardType: 'creature',
                    controller: 'self'
                },
                enemy: {
                    dependsOn: 'friendly',
                    cardType: 'creature',
                    controller: 'opponent',
                    gameAction: ability.actions.cardLastingEffect((context) => ({
                        target: context.targets.friendly,
                        effect: [ability.effects.setPower(context.targets.enemy.getPower())]
                    }))
                }
            },
            effect: '在本回合剩余时间内使得 {1} 的力量等同于 {2} 的力量',
            effectArgs: (context) => [context.targets.friendly, context.targets.enemy]
        });
    }
}

Hoaxpitality.id = 'hoaxpitality';

module.exports = Hoaxpitality;
