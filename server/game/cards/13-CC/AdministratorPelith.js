const Card = require('../../Card.js');

class AdministratorPelith extends Card {
    // After Reap: You may move a friendly Sanctum creature anywhere in your battleline.
    setupCardAbilities(ability) {
        this.reap({
            target: {
                optional: true,
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card) => card.hasHouse('sanctum'),
                gameAction: ability.actions.moveOnBattleline((context) => ({
                    player: context.player
                }))
            },
            effect: '将 {1} 移动到其战线的任意位置',
            effectArgs: (context) => [context.target]
        });
    }
}

AdministratorPelith.id = 'administrator-pelith';

module.exports = AdministratorPelith;
