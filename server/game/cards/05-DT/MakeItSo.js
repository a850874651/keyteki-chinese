const Card = require('../../Card.js');

class MakeItSo extends Card {
    // Play: Choose a house. Reveal the top card of your deck. If that card belongs to the chosen house, draw it and trigger this effect again.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'house'
            },
            effect: '选择 {1} 并展示 {2}',
            effectArgs: (context) => [context.house, context.player.deck[0]],
            gameAction: ability.actions.reveal((context) => ({
                location: 'deck',
                target: context.player.deck[0]
            })),
            then: (preThenContext) => ({
                condition: () => preThenContext.player.deck[0].hasHouse(preThenContext.house),
                gameAction: [
                    ability.actions.draw(),
                    ability.actions.resolveAbility({
                        ability: preThenContext.ability
                    })
                ],
                message: '{0} 使用 {1} 抽卡并再次结算其效果'
            })
        });
    }
}

MakeItSo.id = 'make-it-so';

module.exports = MakeItSo;
