const Card = require('../../Card.js');

class VowOfBlood extends Card {
    // Enhance . (These icons have already been added to cards in your deck.)
    // Play: Deal 2 to each damaged enemy creature.
    setupCardAbilities(ability) {
        this.play({
            effect: '对每个受伤的敌方生物造成2点伤害',
            gameAction: ability.actions.dealDamage((context) => ({
                amount: 2,
                target: context.game.creaturesInPlay.filter(
                    (card) => card.controller !== context.player && card.hasToken('damage')
                )
            }))
        });
    }
}

VowOfBlood.id = 'vow-of-blood';

module.exports = VowOfBlood;
