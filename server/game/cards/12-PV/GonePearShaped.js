const Card = require('../../Card.js');

class GonePearShaped extends Card {
    // Play: Each player discards their archives.
    // Fate: For the remainder of the turn, creatures cannot reap.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.discard((context) => ({
                target: context.player.archives.concat(
                    context.player.opponent ? context.player.opponent.archives : []
                )
            })),
            effect: '每位玩家弃掉其档案',
        });

        this.fate({
            effect: '在本回合剩余时间内生物无法收获',
            gameAction: ability.actions.untilPlayerTurnEnd({
                targetController: 'opponent',
                effect: ability.effects.cardCannot('reap')
            })
        });
    }
}

GonePearShaped.id = 'gone-pear-shaped';

module.exports = GonePearShaped;
