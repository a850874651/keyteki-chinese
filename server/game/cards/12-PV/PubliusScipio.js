const Card = require('../../Card.js');

class PubliusScipio extends Card {
    // Splash-attack 4.
    // Fate: For the remainder of the turn, after you use a friendly creature, deal 4 to its neighbors.
    setupCardAbilities(ability) {
        this.fate({
            effect: '本回合剩余时间内，每使用1个友方生物，其对其相邻生物造成4点伤害',
            gameAction: ability.actions.untilPlayerTurnEnd({
                when: {
                    onUseCard: (event, context) =>
                        event.card.type === 'creature' &&
                        event.card.controller === context.game.activePlayer
                },
                gameAction: ability.actions.dealDamage((context) => ({
                    target: context.event.card.neighbors,
                    amount: 4
                }))
            })
        });
    }
}

PubliusScipio.id = 'publius-scipio';

module.exports = PubliusScipio;
