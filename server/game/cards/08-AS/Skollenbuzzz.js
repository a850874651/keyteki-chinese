const Card = require('../../Card.js');

class Skollenbuzzz extends Card {
    // Play/After Reap: You may put a creature from your hand faceup
    // under Skﾅ粛lﾄ貧bﾅｭzzz.
    //
    // Destroyed: Put each creature under Skﾅ粛lﾄ貧bﾅｭzzz into play under your
    // control. Put Skﾅ粛lﾄ貧bﾅｭzzz on the top of your deck.
    setupCardAbilities(ability) {
        this.play({
            reap: true,
            condition: (context) => context.player.hand.length > 0,
            target: {
                controller: 'self',
                location: 'hand',
                cardType: 'creature',
                optional: true,
                gameAction: ability.actions.placeUnder((context) => ({
                    parent: context.source
                }))
            }
        });

        this.destroyed({
            gameAction: ability.actions.sequentialPutIntoPlay((context) => ({
                controller: context.source.controller,
                forEach: context.source.childCards
            })),
            effect: '将 {0} 下的每个生物放置入场, 并把 {0} 放到其牌库顶',
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.returnToDeck()
            }
        });
    }
}

Skollenbuzzz.id = 'skﾅ粛lﾄ貧bﾅｭzzz';

module.exports = Skollenbuzzz;
