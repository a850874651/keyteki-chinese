const Card = require('../../Card.js');

class FierceCompetition extends Card {
    // Play: Make a token creature. If you and your opponent have the same
    // number of forged keys, archive Fierce Competition.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.makeTokenCreature(),
            then: {
                alwaysTriggers: true,
                condition: (context) =>
                    context.player.opponent &&
                    context.player.getForgedKeys() === context.player.opponent.getForgedKeys(),
                gameAction: ability.actions.archive((context) => ({
                    effect: '归档 {1}',
                    target: context.source
                })),
                message: '{0} 使用 {1} 归档 {3}',
                messageArgs: (context) => [context.source]
            }
        });
    }
}

FierceCompetition.id = 'fierce-competition';

module.exports = FierceCompetition;
