const Card = require('../../Card.js');

class CodexOfTrueNames extends Card {
    // Action: Destroy Codex of True Names. If you do, return each
    // friendly Catena Fiend to its owner窶冱 hand. For each card
    // returned this way, return an enemy creature to its owner窶冱
    // hand.
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.destroy(),
            then: {
                message: '{0} 使用 {1} 将每个友方代标生物返回到其手中',
                gameAction: ability.actions.returnToHand((context) => ({
                    target: context.player.creaturesInPlay.filter((c) => c.name === 'Catena Fiend')
                })),
                then: {
                    alwaysTriggers: true,
                    gameAction: ability.actions.sequentialForEach((context) => ({
                        num: context.preThenEvents.filter((event) => !event.cancelled).length,
                        action: ability.actions.returnToHand({
                            promptForSelect: {
                                activePromptTitle: 'Choose a creature to return to hand',
                                cardType: 'creature',
                                controller: 'opponent',
                                message: "{0} 使用 {1} 将 {2} 返回到 {3} 的手中",
                                messageArgs: (card) => [
                                    context.player,
                                    context.source,
                                    card,
                                    card.owner
                                ]
                            }
                        })
                    }))
                }
            }
        });
    }
}

CodexOfTrueNames.id = 'codex-of-true-names';

module.exports = CodexOfTrueNames;
