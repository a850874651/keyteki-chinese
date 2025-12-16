const Card = require('../../Card.js');

class PKESyphonator extends Card {
    // Play: Gain 1A for each card in your opponent窶冱 archives. Your
    // opponent discards each card in their archives.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            effect: "获得 {1} 琥珀并弃掉 {2} 存档中的所有卡牌",
            effectArgs: (context) => [
                context.player.opponent.archives.length,
                context.player.opponent
            ],
            gameAction: [
                ability.actions.gainAmber((context) => ({
                    amount: context.player.opponent.archives.length
                })),
                ability.actions.discard((context) => ({
                    target: context.player.opponent.archives
                }))
            ]
        });
    }
}

PKESyphonator.id = 'pke-syphonator';

module.exports = PKESyphonator;
