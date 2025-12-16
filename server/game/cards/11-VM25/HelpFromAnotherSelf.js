const Card = require('../../Card.js');

class HelpFromAnotherSelf extends Card {
    // Play: Search your deck and discard pile for a Variant creature, reveal it, and put it into your hand.
    setupCardAbilities(ability) {
        this.play({
            effect: '从牌库和弃牌堆中查找一个变体生物',
            gameAction: ability.actions.search({
                cardCondition: (card) => card.hasTrait('variant') && card.type === 'creature',
                location: ['deck', 'discard'],
                reveal: true,
                amount: 1
            })
        });
    }
}

HelpFromAnotherSelf.id = 'help-from-another-self';

module.exports = HelpFromAnotherSelf;
