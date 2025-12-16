const Card = require('../../Card.js');

class Chronicler extends Card {
    // After Reap: Archive the top card of your deck.
    setupCardAbilities(ability) {
        this.reap({
            gameAction: ability.actions.archive((context) => ({
                target: context.player.deck.slice(0, 1)
            })),
            effect: '归档其牌库顶的卡牌'
        });
    }
}

Chronicler.id = 'chronicler';

module.exports = Chronicler;
