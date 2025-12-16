const Card = require('../../Card.js');

class EmeritusDarn extends Card {
    // Elusive.
    // After Reap: Archive the top 2 cards of your deck.
    setupCardAbilities(ability) {
        this.reap({
            effect: '归档牌库顶的2张牌',
            gameAction: ability.actions.archive((context) => ({
                target: context.player.deck.slice(0, 2)
            }))
        });
    }
}

EmeritusDarn.id = 'emeritus-darn';

module.exports = EmeritusDarn;
