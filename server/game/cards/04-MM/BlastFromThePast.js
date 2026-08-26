const Card = require('../../Card.js');

class BlastFromThePast extends Card {
    // Play: Exalt a friendly creature. Archive a Saurian creature from your discard pile. Deal damage equal to the archived creatures power to an enemy creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.exalt()
            },
            then: {
                alwaysTriggers: true,
                message: '{0} 使用 {1} 归档 {2}',
                target: {
                    cardType: 'creature',
                    location: 'discard',
                    cardCondition: (card) => card.hasHouse('saurian'),
                    controller: 'self',
                    gameAction: ability.actions.archive()
                },
                then: (context) => ({
                    condition: () => !!context.target,
                    message: '{0} 使用 {1} 造成 {3} 点伤害对 {2}',
                    messageArgs: () => [context.target && context.target.power],
                    target: {
                        cardType: 'creature',
                        controller: 'opponent',
                        gameAction: ability.actions.dealDamage({
                            amount: context.target ? context.target.power : 0
                        })
                    }
                })
            }
        });
    }
}

BlastFromThePast.id = 'blast-from-the-past';

module.exports = BlastFromThePast;
