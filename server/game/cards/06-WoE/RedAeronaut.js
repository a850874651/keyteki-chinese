const Card = require('../../Card.js');

class RedAeronaut extends Card {
    // Play: Search your deck and discard pile for a Nautilixian and
    // put it into play, then shuffle your deck.
    //
    // Action: A friendly Nautilixian gets +5 power for the remainder
    // of the turn.
    setupCardAbilities(ability) {
        this.play({
            effect:
                '查找牌库和弃牌堆中的1张鹦鹉螺机甲并将其放置入场，然后混洗牌库',
            target: {
                controller: 'self',
                location: ['discard', 'deck'],
                cardType: 'creature',
                cardCondition: (card) => card.name === 'Nautilixian',
                optional: true,
                gameAction: [ability.actions.putIntoPlay(), ability.actions.shuffleDeck()]
            }
        });

        this.action({
            effect: '1个友方鹦鹉螺机甲获得+5力量直到本回合结束',
            target: {
                controller: 'self',
                cardCondition: (card) => card.name === 'Nautilixian',
                gameAction: ability.actions.cardLastingEffect({
                    duration: 'untilPlayerTurnEnd',
                    effect: ability.effects.modifyPower(5)
                })
            }
        });
    }
}

RedAeronaut.id = 'red-aeronaut';

module.exports = RedAeronaut;
