const Card = require('../../Card.js');

class ImmortalGreking extends Card {
    // Play: Take control of an enemy creature and place it anywhere
    // in your battleline. Until Immortal Greking leaves play, that
    // creature belong's to Immortal Greking's house.
    //
    // Destroyed: If you are haunted, archive Immortal Greking.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.sequential([
                    ability.actions.cardLastingEffect((context) => ({
                        duration: 'lastingEffect',
                        effect: [
                            ability.effects.takeControl(context.source.controller),
                            ability.effects.takeControlOnRight()
                        ]
                    })),
                    ability.actions.moveOnBattleline((context) => ({
                        player: context.player
                    })),
                    ability.actions.cardLastingEffect((context) => ({
                        until: {
                            onCardLeavesPlay: (event) => event.card === context.source
                        },
                        effect: ability.effects.changeHouse(context.source.printedHouse)
                    }))
                ])
            },
            effect:
                '获得 {1} 的控制权并将其放到其战线的任意位置, 使其属于 {2} 势力直到 {3} 离场',
            effectArgs: (context) => [context.target, context.source.printedHouse, context.source]
        });

        this.destroyed({
            condition: (context) => context.source.controller.isHaunted(),
            gameAction: ability.actions.archive()
        });
    }
}

ImmortalGreking.id = 'immortal-greking';

module.exports = ImmortalGreking;
