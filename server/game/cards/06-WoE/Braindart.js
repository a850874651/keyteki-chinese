const Card = require('../../Card.js');

class Braindart extends Card {
    //Play: Enrage an enemy creature. It captures 1A from its own side.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.sequential([
                    ability.actions.enrage(),
                    ability.actions.capture((context) => ({
                        amount: 1,
                        player: context.player.opponent
                    }))
                ])
            },
            effect: '激怒 {0} 使其抢占其己方1琥珀'
        });
    }
}

Braindart.id = 'braindart';

module.exports = Braindart;
