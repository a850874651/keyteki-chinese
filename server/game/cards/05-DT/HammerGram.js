const Card = require('../../Card.js');

class HammerGram extends Card {
    // Play: Deal 3D to a creature and stun it.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.sequential([
                    ability.actions.dealDamage({ amount: 3 }),
                    ability.actions.stun()
                ])
            },
            effect: '造成3点伤害并击晕{0}'
        });
    }
}

HammerGram.id = 'hammer-gram';

module.exports = HammerGram;
