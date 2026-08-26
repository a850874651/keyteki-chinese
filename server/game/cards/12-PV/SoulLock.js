const Card = require('../../Card.js');

class SoulLock extends Card {
    // Your opponent cannot use cards that match the house of any faceup card under Soul Lock.
    // Action: Discard all cards under Soul Lock. Put an enemy creature faceup under Soul Lock.
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'opponent',
            effect: ability.effects.playerCannot('use', (context, effectContext, event) => {
                if (
                    !effectContext.source.childCards ||
                    effectContext.source.childCards.length === 0
                ) {
                    return false;
                }
                const source =
                    event && event.card
                        ? event.card
                        : context.target
                        ? context.target
                        : context.source;
                return effectContext.source.childCards.some((child) =>
                    child.getHouses().some((house) => source.hasHouse(house))
                );
            })
        });

        this.action({
            gameAction: ability.actions.discard((context) => ({
                target: context.source.childCards
            })),
            then: {
                alwaysTriggers: true,
                target: {
                    cardType: 'creature',
                    controller: 'opponent',
                    gameAction: ability.actions.placeUnder((context) => ({
                        parent: context.source
                    }))
                },
                message:
                    '{0} 使用 {1} 把 {2} 放到 {1} 下方并防止{3}使用与这张卡拥有相同势力的卡牌',
                messageArgs: (context) => [context.player.opponent],
                effectAlert: true
            }
        });
    }
}

SoulLock.id = 'soul-lock';

module.exports = SoulLock;
