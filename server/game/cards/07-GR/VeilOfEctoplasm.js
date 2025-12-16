const Card = require('../../Card.js');

class VeilOfEctoplasm extends Card {
    // Play: For each Geistoid card in your discard pile, a friendly
    // creature captures 1 A.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent && context.player.opponent.amber > 0,
            effect:
                '你的弃牌堆中每有1个灵鬼生物，1个友方生物抢占1琥珀',
            gameAction: ability.actions.sequentialForEach((context) => ({
                num: Math.min(
                    context.player.opponent.amber,
                    context.player.discard.filter((c) => c.hasHouse('geistoid')).length
                ),
                action: ability.actions.capture({
                    promptForSelect: {
                        activePromptTitle: 'Choose a creature to capture 1 amber',
                        cardType: 'creature',
                        controller: 'self'
                    }
                })
            }))
        });
    }
}

VeilOfEctoplasm.id = 'veil-of-ectoplasm';

module.exports = VeilOfEctoplasm;
