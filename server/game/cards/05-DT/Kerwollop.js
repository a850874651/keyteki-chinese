const Card = require('../../Card.js');

class Kerwollop extends Card {
    // Play: Deal 1D to each creature. Gain 1A for each creature destroyed this way.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.dealDamage((context) => ({
                target: context.game.creaturesInPlay
            })),
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.gainAmber((context) => ({
                    amount: context.preThenEvents.filter(
                        (event) =>
                            event.destroyEvent &&
                            event.destroyEvent.destroyedByDamageDealt &&
                            event.destroyEvent.resolved
                    ).length
                })),
                message:
                    '{0} 使用 {1} 获得1琥珀，通过每种被这个方式摧毁的生物 ({3}), 共获得 {4} 琥珀',
                messageArgs: (context) => [
                    context.preThenEvents
                        .filter(
                            (event) =>
                                event.destroyEvent &&
                                event.destroyEvent.destroyedByDamageDealt &&
                                event.destroyEvent.resolved
                        )
                        .map((event) => event.card),
                    context.preThenEvents.filter(
                        (event) =>
                            event.destroyEvent &&
                            event.destroyEvent.destroyedByDamageDealt &&
                            event.destroyEvent.resolved
                    ).length
                ]
            }
        });
    }
}

Kerwollop.id = 'kerwollop';

module.exports = Kerwollop;
