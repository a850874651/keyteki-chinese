const Card = require('../../Card.js');

class BaitAndSwitch extends Card {
    // Play: If your opponent has more <A> than you, steal 1<A>. Repeat this card's effect if your opponent still has more <A> than you.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) =>
                context.player.opponent && context.player.amber < context.player.opponent.amber,
            gameAction: ability.actions.steal(),
            then: {
                alwaysTriggers: true,
                condition: (context) =>
                    context.player.opponent && context.player.amber < context.player.opponent.amber,
                gameAction: ability.actions.steal(),
                message: '{0} 使用 {1} 额外窃取了1琥珀'
            }
        });
    }
}

BaitAndSwitch.id = 'bait-and-switch';

module.exports = BaitAndSwitch;
