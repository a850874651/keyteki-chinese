const Card = require('../../Card.js');

class StirCrazy extends Card {
    //Play: Each ready creature captures 1A from its opponent.
    setupCardAbilities(ability) {
        this.play({
            effect: '每个重整状态的生物从其对手处抢占1琥珀',
            gameAction: [
                ability.actions.capture((context) => ({
                    target: context.player.creaturesInPlay.filter((card) => !card.exhausted)
                })),
                ability.actions.capture((context) => ({
                    player: context.player,
                    target: context.player.opponent
                        ? context.player.opponent.creaturesInPlay.filter((card) => !card.exhausted)
                        : []
                }))
            ]
        });
    }
}

StirCrazy.id = 'stir-crazy';

module.exports = StirCrazy;
