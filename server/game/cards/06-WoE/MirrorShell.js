const Card = require('../../Card.js');

class MirrorShell extends Card {
    // Play: Make a token creature.
    //
    // This creature gains, "After Fight/After Reap: For the remainder
    // of the turn, each friendly token creature is a copy of this
    // creature."
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.makeTokenCreature()
        });

        this.whileAttached({
            effect: ability.effects.gainAbility('fight', {
                reap: true,
                effect: '在本回合剩余时间内，使所有友方代标生物变成 {0} 的复制',
                gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                    controller: 'self',
                    // Exclude the source itself, otherwise if Mirror Shell is
                    // attached to a token creature, copying that token onto
                    // itself causes an infinite loop in the copy effects.
                    match: (card) => card.isToken() && card !== context.source,
                    effect: ability.effects.copyCard(context.source)
                }))
            })
        });
    }
}

MirrorShell.id = 'mirror-shell';

module.exports = MirrorShell;
