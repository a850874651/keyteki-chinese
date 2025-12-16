const Card = require('../../Card.js');

class AGhostInTheSun extends Card {
    // Play: For each forged key your opponent has, put a creature into play
    // from your discard pile.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            effect: '{1}每有1把已锻造的钥匙，从弃牌堆中放置1个生物入场',
            effectArgs: (context) => [context.player.opponent],
            gameAction: ability.actions.sequentialForEach((context) => ({
                num: context.player.opponent ? context.player.opponent.getForgedKeys() : 0,
                action: ability.actions.putIntoPlay({
                    promptForSelect: {
                        activePromptTitle: 'Choose a creature to put into play',
                        cardType: 'creature',
                        controller: 'self',
                        location: 'discard',
                        message: '{0} 使用 {1} 将 {2} 放置入场',
                        messageArgs: (cards) => [context.player, context.source, cards]
                    },
                    myControl: true
                })
            }))
        });
    }
}

AGhostInTheSun.id = 'a-ghost-in-the-sun';

module.exports = AGhostInTheSun;
