const Card = require('../../Card.js');

class YzphyzKnowdrone extends Card {
    // Play: Archive a card. You may purge an archived card to stun a creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                location: 'hand',
                controller: 'self',
                gameAction: ability.actions.archive()
            },
            then: {
                alwaysTriggers: true,
                target: {
                    optional: true,
                    controller: 'any',
                    activePromptTitle: 'Choose which card to purge',
                    location: 'archives',
                    gameAction: ability.actions.purge()
                },
                message: '{0} 使用 {1} 清除 {2}',
                messageArgs: (context) => [context.player, context.source, context.target],
                then: {
                    condition: (context) => !context.preThenEvent?.replaced,
                    target: {
                        controller: 'any',
                        cardType: 'creature',
                        activePromptTitle: 'Choose a creature to stun',
                        gameAction: ability.actions.stun()
                    },
                    message: '{0} 使用 {1} 击晕 {2}',
                    messageArgs: (context) => [context.player, context.source, context.target]
                }
            }
        });
    }
}

YzphyzKnowdrone.id = 'yzphyz-knowdrone';

module.exports = YzphyzKnowdrone;
