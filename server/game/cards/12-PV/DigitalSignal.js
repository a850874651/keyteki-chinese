const Card = require('../../Card.js');

class DigitalSignal extends Card {
    // Play: For each card in your opponent's archives, archive a card. Discard your opponent's archives.
    setupCardAbilities(ability) {
        this.play({
            effect: "归档 {1} 张卡牌并弃掉 {2} 从 {3} 的档案",
            effectArgs: (context) => [
                context.player.opponent.archives.length,
                context.player.opponent.archives,
                context.player.opponent
            ],
            condition: (context) =>
                context.player.opponent && context.player.opponent.archives.length > 0,
            target: {
                mode: 'exactly',
                numCards: (context) =>
                    context.player.opponent ? context.player.opponent.archives.length : 0,
                controller: 'self',
                location: 'hand',
                gameAction: ability.actions.archive()
            },
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.discard((context) => ({
                    target: context.player.opponent.archives
                }))
            }
        });
    }
}

DigitalSignal.id = 'digital-signal';

module.exports = DigitalSignal;
