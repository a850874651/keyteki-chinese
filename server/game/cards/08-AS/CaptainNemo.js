const Card = require('../../Card.js');

class CaptainNemo extends Card {
    // After Fight: Destroy an artifact and a creature.
    setupCardAbilities(ability) {
        this.fight({
            gameAction: [
                ability.actions.destroy((context) => ({
                    promptForSelect: {
                        activePromptTitle: 'Choose an artifact to destroy',
                        cardType: 'artifact',
                        message: '{0} 使用 {1} 摧毁 {2}',
                        messageArgs: (card) => [context.player, context.source, card]
                    }
                })),
                ability.actions.destroy((context) => ({
                    promptForSelect: {
                        activePromptTitle: 'Choose a creature to destroy',
                        cardType: 'creature',
                        message: '{0} 使用 {1} 摧毁 {2}',
                        messageArgs: (card) => [context.player, context.source, card]
                    }
                }))
            ],
            effect: '摧毁1个神器和1个生物'
        });
    }
}

CaptainNemo.id = 'captain-nemo';

module.exports = CaptainNemo;
