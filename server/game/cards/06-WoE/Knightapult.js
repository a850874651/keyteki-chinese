const Card = require('../../Card.js');

class Knightapult extends Card {
    // Action: The next time a friendly creature enters play this turn, you may have it enter anywhere in your battleline, ready.
    setupCardAbilities(ability) {
        this.action({
            effect: '本回合下1个入场的友方生物可以从战线的任意位置入场，并重整',
            gameAction: [
                ability.actions.lastingEffect({
                    until: {
                        onCardEntersPlay: (event) =>
                            event.card.type === 'creature' &&
                            event.context.game.activePlayer === event.card.controller,
                        onTurnEnd: () => true
                    },
                    multipleTrigger: false,
                    effect: [ability.effects.enterPlayAnywhere(), ability.effects.entersPlayReady()]
                })
            ]
        });
    }
}

Knightapult.id = 'knightapult';

module.exports = Knightapult;
