const Card = require('../../Card.js');

class LostInTheWild extends Card {
    // Play: Shuffle each flank creature into its owner's deck. If you
    // are haunted, repeat the preceding effect.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.returnToDeck((context) => ({
                target: context.game.creaturesInPlay.filter((card) => card.isOnFlank()),
                shuffle: true
            })),
            then: {
                alwaysTriggers: true,
                condition: (context) => context.player.isHaunted(),
                gameAction: ability.actions.returnToDeck((context) => ({
                    target: context.game.creaturesInPlay.filter((card) => card.isOnFlank()),
                    shuffle: true,
                    shufflePlayer: context.player.opponent
                })),
                message: '{0} 使用 {1} 重复之前的效果'
            }
        });
    }
}

LostInTheWild.id = 'lost-in-the-wild';

module.exports = LostInTheWild;
