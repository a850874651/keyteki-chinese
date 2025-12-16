const Card = require('../../Card.js');

class NiffleSanctuary extends Card {
    // Action: Make a Niffle Brute. Until the end of the turn each
    // Niffle Brute gains, “After Fight: Gain 1A.”
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.conditional({
                condition: (context) =>
                    context.player.tokenCard && context.player.tokenCard.name === 'Niffle Brute',
                trueGameAction: ability.actions.makeTokenCreature()
            }),
            effect: '{1}',
            effectArgs: (context) => [
                context.player.tokenCard && context.player.tokenCard.name === 'Niffle Brute'
                    ? '制造1个代标生物'
                    : ''
            ],
            then: {
                alwaysTriggers: true,
                message:
                    '{0} 使用 {1} 使得本回合内友方代标生物拥有战斗后获得1琥珀的效果',
                gameAction: ability.actions.untilPlayerTurnEnd({
                    targetController: 'current',
                    match: (card) => card.name === 'Niffle Brute',
                    effect: ability.effects.gainAbility('fight', {
                        gameAction: ability.actions.gainAmber()
                    })
                })
            }
        });
    }
}

NiffleSanctuary.id = 'niffle-sanctuary';

module.exports = NiffleSanctuary;
