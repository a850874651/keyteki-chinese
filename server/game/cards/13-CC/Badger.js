const Card = require('../../Card.js');

class Badger extends Card {
    // Play/After Reap: For the remainder of the turn, after you play a Brobnar creature, deal 3 damage to an enemy creature.
    setupCardAbilities(ability) {
        this.play({
            reap: true,
            effect:
                '在本回合剩余时间内，每打出一个蛮族生物，对一个敌方生物造成3点伤害',
            gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                when: {
                    onCardPlayed: (event) =>
                        event.player === context.player &&
                        event.card.type === 'creature' &&
                        event.card.hasHouse('brobnar')
                },
                preferActionPromptMessage: true,
                gameAction: ability.actions.dealDamage({
                    promptForSelect: {
                        cardType: 'creature',
                        controller: 'opponent',
                        message: '{0} 使用 {1} 造成了3点伤害对 {2}',
                        messageArgs: (card) => [context.player, context.source, card]
                    },
                    amount: 3
                })
            }))
        });
    }
}

Badger.id = 'badger';

module.exports = Badger;
