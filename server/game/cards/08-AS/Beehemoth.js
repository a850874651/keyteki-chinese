const Card = require('../../Card.js');

class Beehemoth extends Card {
    // At the start of your turn, give a creature a +1 power counter.
    // After Reap: Move Beehemoth anywhere in your battleline. Remove
    // each +1 power counter from Beehemoth窶冱 neighbors. For each +1
    // power counter removed this way, gain 1A.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onTurnStart: (_, context) => context.player === this.game.activePlayer
            },
            target: {
                cardType: 'creature',
                gameAction: ability.actions.addPowerCounter()
            }
        });

        this.reap({
            gameAction: ability.actions.moveOnBattleline((context) => ({
                player: context.player
            })),
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.removePowerCounter((context) => ({
                    target: context.source.neighbors,
                    all: true
                })),
                then: {
                    alwaysTriggers: true,
                    gameAction: ability.actions.gainAmber((context) => ({
                        amount: context.preThenEvents.reduce((acc, e) => acc + e.amount, 0)
                    })),
                    message:
                        '{0} 使用 {1} 移除所有的1力量指示物从 {3} 并获得 {4} 琥珀',
                    messageArgs: (context) => [
                        context.source.neighbors,
                        context.preThenEvents.reduce((acc, e) => acc + e.amount, 0)
                    ]
                }
            }
        });
    }
}

Beehemoth.id = 'beehemoth';

module.exports = Beehemoth;
