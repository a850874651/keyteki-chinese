const Card = require('../../Card.js');

class BuildYourChampion extends Card {
    // Play: Search your deck and discard pile for two halves of a
    // gigantic creature, reveal them, and archive them.
    setupCardAbilities(ability) {
        this.play({
            effect: '查找1个巨大生物的两个部分并归档它们',
            gameAction: ability.actions.search({
                cardCondition: (card) => card.gigantic,
                amount: 2,
                destination: 'archives'
            })
        });
    }
}

BuildYourChampion.id = 'build-your-champion';

module.exports = BuildYourChampion;
