const Card = require('../../Card.js');

class CrepuscularRays extends Card {
    // Play: Choose a friendly creature. Move each A from that
    // creature to your pool. Destroy that creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: [
                    ability.actions.returnAmber((context) => ({
                        all: true,
                        recipient: context.player
                    })),
                    ability.actions.destroy()
                ]
            },
            effect: '移动所有 {1} 琥珀从 {0} 到其池中并摧毁 {0}',
            effectArgs: (context) => [context.target.amber]
        });
    }
}

CrepuscularRays.id = 'crepuscular-rays';

module.exports = CrepuscularRays;
