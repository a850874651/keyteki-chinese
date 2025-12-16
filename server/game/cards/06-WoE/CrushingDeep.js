const Card = require('../../Card.js');

class CrushingDeep extends Card {
    //Play: During your opponent's next turn, keys cost +3A for each forged key they have.
    setupCardAbilities(ability) {
        this.play({
            effect: "在{1}的下个回合，其每有1把已锻造的钥匙，其钥匙费用+3",
            effectArgs: (context) => context.player.opponent,
            gameAction: ability.actions.duringOpponentNextTurn({
                targetController: 'any',
                effect: ability.effects.modifyKeyCost((player, context) =>
                    context.player.opponent ? context.player.opponent.getForgedKeys() * 3 : 0
                )
            })
        });
    }
}

CrushingDeep.id = 'crushing-deep';

module.exports = CrushingDeep;
