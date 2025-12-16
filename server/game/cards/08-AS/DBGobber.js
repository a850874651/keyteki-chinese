const Card = require('../../Card.js');

class DBGobber extends Card {
    // After Reap: Your opponent loses 1A.
    // Scrap: Each player with 7A or more loses 2A.
    setupCardAbilities(ability) {
        this.reap({
            gameAction: ability.actions.loseAmber()
        });

        this.scrap({
            message: '{0} 使用 {1} 使得所有拥有至少7琥珀的玩家失去2琥珀',
            messageArgs: (context) => [context.player, context.source],
            gameAction: [
                ability.actions.conditional({
                    condition: (context) => context.player.amber >= 7,
                    trueGameAction: ability.actions.loseAmber((context) => ({
                        target: context.player,
                        amount: 2
                    }))
                }),
                ability.actions.conditional({
                    condition: (context) =>
                        !!context.player.opponent && context.player.opponent.amber >= 7,
                    trueGameAction: ability.actions.loseAmber({
                        amount: 2
                    })
                })
            ]
        });
    }
}

DBGobber.id = 'db-gobber';

module.exports = DBGobber;
