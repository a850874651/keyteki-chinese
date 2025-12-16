const Card = require('../../Card.js');

class UnstableDale extends Card {
    // After Reap: Deal 1 damage to each creature for each card in your hand.
    // Fate: Deal 3 damage to each friendly creature.
    setupCardAbilities(ability) {
        this.reap({
            effect: '每有1张手牌对所有生物造成1点伤害',
            gameAction: ability.actions.dealDamage((context) => ({
                amount: context.player.hand.length,
                target: context.game.creaturesInPlay
            }))
        });

        this.fate({
            effect: '对所有友方生物造成3点伤害',
            gameAction: ability.actions.dealDamage((context) => ({
                amount: 3,
                target: context.game.activePlayer.creaturesInPlay
            }))
        });
    }
}

UnstableDale.id = 'unstable-dale';

module.exports = UnstableDale;
