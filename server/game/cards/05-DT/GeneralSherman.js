const Card = require('../../Card.js');

class GeneralSherman extends Card {
    // General Sherman deals no damage when fighting.
    // Play: Purge each other creature. If General Sherman leaves play, return to play each creature purged this way (exhausted and under its owner窶冱 control).
    setupCardAbilities(ability) {
        this.persistentEffect({
            effect: ability.effects.cardCannot('dealFightDamage')
        });

        this.play({
            effect: '清除每个其他生物',
            gameAction: [
                ability.actions.purge((context) => ({
                    purgedBy: context.source,
                    target: context.game.creaturesInPlay.filter((card) => card !== context.source)
                })),
                ability.actions.lastingEffect({
                    targetController: 'current',
                    multipleTrigger: false,
                    when: {
                        onCardLeavesPlay: (event, context) => event.card === context.source
                    },
                    gameAction: ability.actions.sequentialPutIntoPlay((context) => ({
                        forEach: context.event.clone.clonedPurgedCards
                    })),
                    message: '{0} 将所有被 {1} 清除的生物放置入场',
                    messageArgs: (context) => [context.game.activePlayer, context.source]
                })
            ]
        });
    }
}

GeneralSherman.id = 'general-sherman';

module.exports = GeneralSherman;
