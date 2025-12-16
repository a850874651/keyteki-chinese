const Card = require('../../Card.js');

class ShellOfAGhost extends Card {
    // Play: Destroy each creature that is not on a flank. Put a
    // creature from any discard pile into play under your
    // control. Gain 2 chains.
    setupCardAbilities(ability) {
        this.play({
            effect: '摧毁每个不在侧翼的生物',
            gameAction: ability.actions.destroy((context) => ({
                target: context.game.creaturesInPlay.filter((card) => !card.isOnFlank())
            })),
            then: {
                alwaysTriggers: true,
                target: {
                    controller: 'any',
                    location: 'discard',
                    cardType: 'creature',
                    gameAction: ability.actions.putIntoPlay({
                        myControl: true
                    })
                },
                message: '{0} 使用 {1} 将 {3} 放置入场',
                messageArgs: (context) => [context.target ? context.target : 'nothing'],
                then: {
                    alwaysTriggers: true,
                    gameAction: ability.actions.gainChains({ amount: 2 }),
                    message: '{0} 使用 {1} 获得2枷锁'
                }
            }
        });
    }
}

ShellOfAGhost.id = 'shell-of-a-ghost';

module.exports = ShellOfAGhost;
