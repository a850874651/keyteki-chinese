const Card = require('../../Card.js');

class QuantumCompass extends Card {
    // Omni: Archive the top card of your deck.
    setupCardAbilities(ability) {
        this.omni({
            effect: '归档其牌库顶的卡牌',
            gameAction: ability.actions.archive((context) => ({
                target: context.player.deck.length > 0 ? context.player.deck[0] : []
            }))
        });
    }
}

QuantumCompass.id = 'quantum-compass';

module.exports = QuantumCompass;
