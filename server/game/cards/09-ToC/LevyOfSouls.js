const Card = require('../../Card.js');

class LevyOfSouls extends Card {
    // Action: Make a token creature. Keys cost +1A for each friendly token
    // creature in play during your opponent's next turn.
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.makeTokenCreature(),
            then: {
                alwaysTriggers: true,
                condition: (context) => !!context.player.opponent,
                message:
                    "{0} 使用 {1} 每拥有1个友方代标生物就增加1钥匙费用在 {2} 的下回合中",
                messageArgs: (context) => [context.player, context.source, context.player.opponent],
                gameAction: ability.actions.duringOpponentNextTurn({
                    targetController: 'any',
                    effect: ability.effects.modifyKeyCost(
                        (_, context) =>
                            context.player.creaturesInPlay.filter((card) => card.isToken()).length
                    )
                })
            }
        });
    }
}

LevyOfSouls.id = 'levy-of-souls';

module.exports = LevyOfSouls;
