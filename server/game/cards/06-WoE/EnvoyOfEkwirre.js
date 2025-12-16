const Card = require('../../Card.js');

class EnvoyOfEkwirre extends Card {
    // After Reap: Swap Envoy of Ekwirr with one of its neighbors. Also swap all , damage, counters, and upgrades on these creatures.
    setupCardAbilities(ability) {
        this.reap({
            condition: (context) => context.player.creaturesInPlay.length > 1,
            target: {
                cardType: 'creature',
                cardCondition: (card, context) => context.source.neighbors.includes(card),
                gameAction: ability.actions.swap({
                    swapTokens: true,
                    swapUpgrades: true
                })
            },
            effect: '与 {0} 交换其位置、琥珀、伤害、指示物、升级'
        });
    }
}

EnvoyOfEkwirre.id = 'envoy-of-ekwirrĕ';

module.exports = EnvoyOfEkwirre;
