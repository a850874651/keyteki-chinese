const Card = require('../../Card.js');

class NamelsConfession extends Card {
    // Play: Destroy a friendly creature. If you do, gain A equal to half its power (rounding down the gain).
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.destroy()
            },
            effect: '摧毁 {0} 并获得了其力量值一半的琥珀',
            then: {
                condition: (context) =>
                    context.preThenEvents &&
                    context.preThenEvents.every((event) => !event.cancelled),
                gameAction: ability.actions.gainAmber((context) => ({
                    amount: Math.floor(context.preThenEvents[0].clone.modifiedPower / 2)
                }))
            }
        });
    }
}

NamelsConfession.id = 'namel-s-confession';

module.exports = NamelsConfession;
