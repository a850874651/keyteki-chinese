const Card = require('../../Card.js');

class Sleight extends Card {
    // Destroyed: Shuffle each creature into its owner's deck.
    // Fate: For each enemy Shadows creature, shuffle a friendly creature into its owner's deck.
    setupCardAbilities(ability) {
        this.destroyed({
            gameAction: ability.actions.returnToDeck((context) => ({
                target: context.game.creaturesInPlay,
                shuffle: true
            }))
        });

        this.fate({
            effect:
                "每有1个敌方暗影生物，将1个友方生物洗回其所有者的牌库",
            gameAction: ability.actions.sequentialForEach((context) => ({
                num: context.game.activePlayer.opponent.creaturesInPlay.filter((card) =>
                    card.hasHouse('shadows')
                ).length,
                action: ability.actions.returnToDeck((context) => ({
                    promptForSelect: {
                        activePromptTitle:
                            "Choose a friendly creature to shuffle into its owner's deck",
                        cardType: 'creature',
                        controller: 'opponent',
                        message: '{0} 使用 {1} 将 {2} 洗入其牌库',
                        messageArgs: (cards) => [context.source, context.player, cards]
                    },
                    shuffle: true
                }))
            }))
        });
    }
}

Sleight.id = 'sleight';

module.exports = Sleight;
