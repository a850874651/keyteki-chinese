const Card = require('../../Card.js');

class DistributorJanoont extends Card {
    // After Fight/After Reap: Move 1A from a creature to another creature.
    setupCardAbilities(ability) {
        this.reap({
            fight: true,
            condition: (context) => context.game.creaturesInPlay.length > 1,
            target: {
                cardType: 'creature',
                gameAction: ability.actions.removeAmber()
            },
            then: (preContext) => ({
                gameAction: ability.actions.placeAmber({
                    promptForSelect: {
                        message: '{0} égóp {1} è´1ò¢‡Ê‡ﬂï˙ç› {2} è„',
                        messageArgs: (card) => [preContext.player, preContext.source, card],
                        cardType: 'creature',
                        activePromptTitle: 'Choose another creature',
                        cardCondition: (card) => card !== preContext.target
                    }
                })
            })
        });
    }
}

DistributorJanoont.id = 'distributor-jan≈è≈ènt';

module.exports = DistributorJanoont;
