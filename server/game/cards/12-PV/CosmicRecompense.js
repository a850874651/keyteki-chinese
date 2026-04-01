const Card = require('../../Card.js');

class CosmicRecompense extends Card {
    // Play: Deal 3D to an enemy creature. If it is not destroyed, steal 1A. Repeat the preceding effect.
    // Fate: You cannot play cards for the remainder of the turn.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) =>
                context.player.opponent && context.player.opponent.creaturesInPlay.length > 0,
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.sequential([
                    ability.actions.dealDamage({ amount: 3 }),
                    ability.actions.steal((context) => ({
                        target: context.player.opponent,
                        amount: context.target
                            ? context.target.location === 'play area'
                                ? 1
                                : 0
                            : 0
                    }))
                ])
            },
            effect: '造成3点伤害对 {0} 并窃取1琥珀从 {1} 如果它没有被摧毁',
            effectArgs: (context) => [context.player.opponent],
            then: {
                alwaysTriggers: true,
                target: {
                    cardType: 'creature',
                    controller: 'opponent',
                    gameAction: ability.actions.sequential([
                        ability.actions.dealDamage({ amount: 3 }),
                        ability.actions.steal((context) => ({
                            target: context.player.opponent,
                            amount: context.target
                                ? context.target.location === 'play area'
                                    ? 1
                                    : 0
                                : 0
                        }))
                    ])
                },
                message:
                    '{0} 使用 {1} 造成3点伤害对 {3} 并窃取1琥珀从 {4} 如果其没有被摧毁',
                messageArgs: (context) => [context.target, context.player.opponent]
            }
        });

        this.fate({
            effect: '本回合剩余时间内无法打出卡牌',
            gameAction: ability.actions.untilPlayerTurnEnd({
                targetController: 'opponent',
                effect: ability.effects.playerCannot('play')
            })
        });
    }
}

CosmicRecompense.id = 'cosmic-recompense';

module.exports = CosmicRecompense;
