const Card = require('../../Card.js');

class TyrannusAquilae extends Card {
    // At the end of each player窶冱 turn, Tyrannus Aquilae captures 1A.
    // After Fight: Move 1A from Tyrannus Aquilae to your pool.
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onTurnEnd: () => true
            },
            gameAction: ability.actions.capture()
        });

        this.fight({
            condition: (context) => context.source.amber > 0,
            effect: '移动 1 琥珀从 {0} 到其琥珀池中',
            gameAction: ability.actions.removeAmber(),
            then: {
                gameAction: ability.actions.gainAmber((context) => ({
                    amount: context.preThenEvent.amount
                }))
            }
        });
    }
}

TyrannusAquilae.id = 'tyrannus-aquilae';

module.exports = TyrannusAquilae;
