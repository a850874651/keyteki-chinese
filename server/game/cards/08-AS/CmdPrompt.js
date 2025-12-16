const Card = require('../../Card.js');

class CmdPrompt extends Card {
    // After Reap: You may play a non-Logos card this turn.
    setupCardAbilities(ability) {
        this.reap({
            effect: '允许其本回合打出1张非逻机牌',
            gameAction: ability.actions.untilPlayerTurnEnd({
                effect: ability.effects.canPlayNonHouse('logos')
            })
        });
    }
}

CmdPrompt.id = 'cmd-prompt';

module.exports = CmdPrompt;
