const Card = require('../../Card.js');

class LictorJustinian extends Card {
    // After your opponent plays a card, deal 1D to each enemy creature.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardPlayed: (event, context) => event.player === context.player.opponent
            },
            effect: '对每个敌方生物造成 1 点伤害',
            gameAction: ability.actions.dealDamage((context) => ({
                target: context.player.opponent.creaturesInPlay,
                amount: 1
            }))
        });
    }
}

LictorJustinian.id = 'lictor-justinian';

module.exports = LictorJustinian;
