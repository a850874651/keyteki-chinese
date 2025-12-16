const Card = require('../../Card.js');

class TheMist extends Card {
    // Omni: Destroy The Mist. For the remainder of the turn, each creature gains the Mutant trait.
    setupCardAbilities(ability) {
        this.omni({
            gameAction: [
                ability.actions.destroy(),
                ability.actions.untilPlayerTurnEnd({
                    targetController: 'any',
                    effect: ability.effects.addTrait('mutant')
                })
            ],
            effect:
                '摧毁 {0} 并使本回合剩余时间内每个生物获得变异体特性',
            effectArgs: (context) => context.source
        });
    }
}

TheMist.id = 'the-mist';

module.exports = TheMist;
