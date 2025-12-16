const Card = require('../../Card.js');

class KathaTheWise extends Card {
    // Omni: You may play an Untamed creature from your hand.
    setupCardAbilities(ability) {
        this.omni({
            effect: '允许其打出1个狂兽生物',
            gameAction: ability.actions.untilPlayerTurnEnd({
                effect: ability.effects.canPlayHouse({
                    house: 'untamed',
                    condition: (card) => card.type === 'creature' && card.location === 'hand'
                })
            })
        });
    }
}

KathaTheWise.id = 'katha-the-wise';

module.exports = KathaTheWise;
