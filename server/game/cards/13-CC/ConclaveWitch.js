const Card = require('../../Card.js');

class ConclaveWitch extends Card {
    // Enhance 1.
    // Action: Gain 1 amber for each friendly Untamed creature.
    setupCardAbilities(ability) {
        this.action({
            effect: '获得 {1} 琥珀, 根据友方狂兽生物的数量',
            effectArgs: (context) => [
                context.player.creaturesInPlay.filter((card) => card.hasHouse('untamed')).length
            ],
            gameAction: ability.actions.gainAmber((context) => ({
                amount: context.player.creaturesInPlay.filter((card) => card.hasHouse('untamed'))
                    .length
            }))
        });
    }
}

ConclaveWitch.id = 'conclave-witch';

module.exports = ConclaveWitch;
