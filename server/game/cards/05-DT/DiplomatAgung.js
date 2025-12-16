const Card = require('../../Card.js');

class DiplomatAgung extends Card {
    // Play/Fight/Reap: For the remainder of the turn, a friendly creature belongs to the house of your choice in addition to its other houses.
    setupCardAbilities(ability) {
        this.play({
            fight: true,
            reap: true,
            targets: {
                select: {
                    mode: 'house'
                },
                card: {
                    dependsOn: 'select',
                    cardType: 'creature',
                    controller: 'self',
                    gameAction: ability.actions.cardLastingEffect((context) => ({
                        effect: ability.effects.addHouse(context.houses.select.choice)
                    }))
                }
            },
            effect: '使得 {1} 额外属于势力 {2} ',
            effectArgs: (context) => [context.targets.card, context.houses.select.choice]
        });
    }
}

DiplomatAgung.id = 'diplomat-agung';

module.exports = DiplomatAgung;
