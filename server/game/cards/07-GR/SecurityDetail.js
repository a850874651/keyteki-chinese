const Card = require('../../Card.js');

class SecurityDetail extends Card {
    // Play: A friendly creature and each of its neighbors captures 1A.
    setupCardAbilities(ability) {
        this.play({
            target: {
                controller: 'self',
                cardType: 'creature',
                gameAction: ability.actions.capture((context) => ({
                    target: context.target.neighbors.concat(context.target)
                }))
            },
            effect: '抢占 1 琥珀到 {1} 上',
            effectArgs: (context) => [context.target?.neighbors.concat(context.target) ?? []]
        });
    }
}

SecurityDetail.id = 'security-detail';

module.exports = SecurityDetail;
