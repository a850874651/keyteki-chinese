const Card = require('../../Card.js');

class TheLongCon extends Card {
    // Each friendly Stooge cannot reap.
    //
    // Action: Make a Stooge. Destroy any number of friendly
    // Stooges. If 6 or more Stooges are destroyed this way, forge a
    // key at no cost and purge The Long Con.
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'current',
            match: (card) => card.name === 'Stooge',
            effect: ability.effects.cardCannot('reap')
        });

        this.action({
            gameAction: ability.actions.conditional({
                condition: (context) =>
                    context.player.tokenCard && context.player.tokenCard.name === 'Stooge',
                trueGameAction: ability.actions.makeTokenCreature()
            }),
            effect: '{1}',
            effectArgs: (context) => [
                context.player.tokenCard && context.player.tokenCard.name === 'Stooge'
                    ? '制造1个代标生物'
                    : ''
            ],
            then: {
                alwaysTriggers: true,
                target: {
                    controller: 'self',
                    cardType: 'creature',
                    mode: 'unlimited',
                    cardCondition: (card) => card.name === 'Stooge',
                    gameAction: ability.actions.destroy()
                },
                message: '{0} 使用 {1} 摧毁 {3} 个代标生物{4}',
                messageArgs: (context) => [
                    context.target.length,
                    context.target.length === 1 ? '' : ''
                ],
                then: {
                    condition: (context) =>
                        context.preThenEvents.filter((event) => !event.cancelled).length >= 6,
                    gameAction: ability.actions.sequential([
                        ability.actions.forgeKey((context) => ({
                            modifier: -context.player.getCurrentKeyCost()
                        })),
                        ability.actions.purge()
                    ]),
                    message: '{0} 使用 {1} 清除 {1}'
                }
            }
        });
    }
}

TheLongCon.id = 'the-long-con';

module.exports = TheLongCon;
