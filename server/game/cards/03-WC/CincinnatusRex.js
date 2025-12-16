const Card = require('../../Card.js');

class CincinnatusRex extends Card {
    // If there are no enemy creatures, destroy Cincinnatus Rex.
    // Fight: You may exalt Cincinnatus Rex. If you do, ready each other friendly card.
    setupCardAbilities(ability) {
        this.persistentEffect({
            effect: ability.effects.terminalCondition({
                condition: (context) =>
                    !context.source.controller.opponent ||
                    context.source.controller.opponent.creaturesInPlay.length === 0,
                message: '{0} 被摧毁了，因为没有敌方生物',
                gameAction: ability.actions.destroy()
            })
        });

        this.play({
            condition: (context) => context.player.opponent.creaturesInPlay.length === 0,
            gameAction: ability.actions.destroy((context) => ({ target: context.source }))
        });

        this.fight({
            optional: true,
            gameAction: ability.actions.exalt(),
            then: {
                gameAction: ability.actions.ready((context) => ({
                    target: context.player.cardsInPlay.filter((card) => card !== context.source)
                }))
            }
        });
    }
}

CincinnatusRex.id = 'cincinnatus-rex';

module.exports = CincinnatusRex;
