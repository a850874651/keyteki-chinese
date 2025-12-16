const Card = require('../../Card.js');

class ReallocationAccessory extends Card {
    // This creature gains, “After Reap: Archive a card. Choose a
    // player. For each card in the chosen player's archives, deal 1A
    // to a creature.”
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: ability.effects.gainAbility('reap', {
                target: {
                    location: 'hand',
                    controller: 'self',
                    gameAction: ability.actions.archive()
                },
                then: {
                    alwaysTriggers: true,
                    target: {
                        mode: 'select',
                        activePromptTitle: "Which player's archives",
                        choices: {
                            Mine: () => true,
                            "Opponent's": (context) => !!context.player.opponent
                        }
                    },
                    message:
                        "{0} 使用 {1} 对1个生物造成伤害根据 {3} 档案内卡牌的数量",
                    messageArgs: (context) => [
                        !context.select || context.select === 'Mine'
                            ? context.player
                            : context.player.opponent
                    ],
                    gameAction: ability.actions.allocateDamage((context) => ({
                        numSteps:
                            !context.select || context.select === 'Mine'
                                ? context.player.archives.length
                                : context.player.opponent.archives.length
                    }))
                }
            })
        });
    }
}

ReallocationAccessory.id = 'reallocation-accessory';

module.exports = ReallocationAccessory;
