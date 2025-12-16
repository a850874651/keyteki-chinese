const Card = require('../../Card.js');

class WipeClear extends Card {
    // Play: Deal 1D to each creature. Destroy each upgrade.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.sequential([
                ability.actions.dealDamage((context) => ({
                    target: context.game.creaturesInPlay
                })),
                ability.actions.destroy((context) => ({
                    target: context.game.creaturesInPlay.flatMap((card) => card.upgrades || [])
                }))
            ]),
            effect: '对每个生物造成1点伤害并摧毁每个升级'
        });
    }
}

WipeClear.id = 'wipe-clear';

module.exports = WipeClear;
