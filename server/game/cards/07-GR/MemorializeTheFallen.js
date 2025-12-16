const Card = require('../../Card.js');

class MemorializeTheFallen extends Card {
    // Play: Each player loses A equal to the number of creatures in
    // their discard pile.
    setupCardAbilities(ability) {
        this.play({
            effect: '使 {1} 失去 {2} 琥珀并使 {3} 失去 {4} 琥珀',
            effectArgs: (context) => [
                context.player,
                context.player.discard.filter((c) => c.type === 'creature').length,
                context.player.opponent,
                context.player.opponent
                    ? context.player.opponent.discard.filter((c) => c.type === 'creature').length
                    : 0
            ],
            gameAction: [
                ability.actions.loseAmber((context) => ({
                    target: context.player,
                    amount: context.player.discard.filter((c) => c.type === 'creature').length
                })),
                ability.actions.loseAmber((context) => ({
                    amount: context.player.opponent
                        ? context.player.opponent.discard.filter((c) => c.type === 'creature')
                              .length
                        : 0
                }))
            ]
        });
    }
}

MemorializeTheFallen.id = 'memorialize-the-fallen';

module.exports = MemorializeTheFallen;
