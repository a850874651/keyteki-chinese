const Card = require('../../Card.js');

class FinalRefrain extends Card {
    // Play: Put each creature from your discard pile into play ready,
    // then fight with them one at a time. Destroy each creature put
    // into play this way.
    setupCardAbilities(ability) {
        this.zombies = [];

        this.play({
            condition: (context) =>
                !!context.player.opponent &&
                context.player.discard.filter((c) => c.type === 'creature').length > 0,
            gameAction: ability.actions.sequentialPutIntoPlay((context) => {
                this.zombies = context.player.discard.filter((c) => c.type === 'creature');
                return {
                    forEach: this.zombies,
                    ready: true
                };
            }),
            then: {
                gameAction: ability.actions.sequential([
                    ability.actions.sequentialFight(() => {
                        this.zombies = this.zombies.filter((c) => c.location === 'play area');
                        return {
                            forEach: this.zombies
                        };
                    }),
                    ability.actions.destroy(() => {
                        return {
                            target: this.zombies
                        };
                    })
                ]),
                message:
                    '{0} 使用 {1} 将 {3} 放置入场并重整, 逐一战斗，摧毁这些生物',
                messageArgs: () => [this.zombies]
            }
        });
    }
}

FinalRefrain.id = 'final-refrain';

module.exports = FinalRefrain;
