const Card = require('../../Card.js');

class Commandeer extends Card {
    // Play: For the remainder of the turn, after you play another card, a friendly creature captures 1A.
    setupCardAbilities(ability) {
        this.play({
            effect: 'capture an amber after playing a card for the remainder of the turn',
            gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                when: {
                    onCardPlayed: (event) =>
                        event.player === context.player && event.card !== context.source
                },
                preferActionPromptMessage: true,
                gameAction: ability.actions.capture({
                    promptForSelect: {
                        cardType: 'creature',
                        controller: 'self',
                        message:
                            '{0} 使用 {1} 从对手抢占琥珀并放在 {2} 上',
                        messageArgs: (card) => [context.player, context.source, card]
                    }
                })
            }))
        });
    }
}

Commandeer.id = 'commandeer';

module.exports = Commandeer;
