const Card = require('../../Card.js');

class AvengingAura extends Card {
    // For the remainder of the turn, each friendly creature gains assault X, where X is the number of forged keys your opponent has.
    setupCardAbilities(ability) {
        this.play({
            effect: '在本回合剩余时间内给与每个友方生物突袭 {0} ',
            effectArgs: (context) =>
                context.player.opponent ? context.player.opponent.getForgedKeys() : 0,
            gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                target: context.player.creaturesInPlay,
                effect: ability.effects.addKeyword({
                    assault: context.player.opponent ? context.player.opponent.getForgedKeys() : 0
                })
            }))
        });
    }
}

AvengingAura.id = 'avenging-aura';

module.exports = AvengingAura;
