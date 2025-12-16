const Card = require('../../Card.js');

class ContractExecution extends Card {
    // Play: For the remainder of the turn, each time you play a
    // creature, deal 2D to a creature.
    setupCardAbilities(ability) {
        this.play({
            effect:
                '在本回合的剩余时间内每打出1张生物，对1个生物造成2点伤害',
            gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                when: {
                    onCardPlayed: (event) =>
                        event.player === context.player &&
                        event.card !== context.source &&
                        event.card.type === 'creature'
                },
                preferActionPromptMessage: true,
                gameAction: ability.actions.dealDamage({
                    promptForSelect: {
                        cardType: 'creature',
                        controller: 'any',
                        message: '{0} 使用 {1} 造成2点伤害对 {2}',
                        messageArgs: (card) => [context.player, context.source, card]
                    },
                    amount: 2
                })
            }))
        });
    }
}

ContractExecution.id = 'contract-execution';

module.exports = ContractExecution;
