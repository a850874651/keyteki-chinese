const Card = require('../../Card.js');

class EnviousVenomite extends Card {
    // Skirmish.
    // While your opponent has more amber than you, Envious Venomite gains poison.
    // Fate: For the remainder of the turn, each enemy creature gains poison.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) =>
                context.player.opponent && context.player.opponent.amber > context.player.amber,
            effect: ability.effects.addKeyword({ poison: 1 })
        });

        this.fate({
            gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                match: (card) =>
                    card.type === 'creature' && card.controller !== context.game.activePlayer,
                effect: ability.effects.addKeyword({
                    poison: 1
                })
            })),
            message: '{0} 使用 {1} 在本回合的剩余时间内给予每个敌方生物剧毒',
            messageArgs: (context) => [context.player, context.source]
        });
    }
}

EnviousVenomite.id = 'envious-venomite';

module.exports = EnviousVenomite;
