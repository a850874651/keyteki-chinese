const Card = require('../../Card.js');

class RootAccess extends Card {
    // Play: Discard the bottom card of your opponent窶冱 deck. Deal 2D
    // to each enemy creature that shares a house with the discarded
    // card.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) =>
                !!context.player.opponent && context.player.opponent.deck.length > 0,
            gameAction: ability.actions.discard((context) => ({
                target: context.player.opponent.deck[context.player.opponent.deck.length - 1]
            })),
            then: {
                gameAction: ability.actions.dealDamage((context) => ({
                    amount: 2,
                    target: context.player.opponent.creaturesInPlay.filter((card) =>
                        context.preThenEvent.card.getHouses().some((house) => card.hasHouse(house))
                    )
                })),
                message:
                    '{0} 使用 {1} 造成2点伤害对所有与 {3} 拥有相同势力的敌方生物',
                messageArgs: (context) => [context.preThenEvent.card]
            }
        });
    }
}

RootAccess.id = 'root-access';

module.exports = RootAccess;
