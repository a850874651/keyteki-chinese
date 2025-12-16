const Card = require('../../Card.js');

class Chaosodon extends Card {
    // Splash-attack 3. (When this creature attacks, also deal 3 to each of the attacked creatures neighbors.)
    // Before Fight: Deal 3 to each of Chaosodons neighbors.
    setupCardAbilities(ability) {
        this.beforeFight({
            effect: "对 {1} 的每个相邻生物造成3点伤害",
            effectArgs: (context) => context.source,
            gameAction: ability.actions.dealDamage((context) => ({
                amount: 3,
                target: context.source.neighbors
            }))
        });
    }
}

Chaosodon.id = 'chaosodon';

module.exports = Chaosodon;
