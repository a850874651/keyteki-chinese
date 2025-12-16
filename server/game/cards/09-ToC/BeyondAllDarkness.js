const Card = require('../../Card.js');

class BeyondAllDarkness extends Card {
    // Play: For the remainder of the turn, after a creature is
    // destroyed, make a token creature.
    setupCardAbilities(ability) {
        this.play({
            effect:
                '在本回合的剩余时间内，每当1个生物被摧毁，制造1个代标生物',
            gameAction: ability.actions.untilPlayerTurnEnd({
                when: {
                    onCardDestroyed: (event) => event.clone.type === 'creature'
                },
                gameAction: ability.actions.makeTokenCreature()
            })
        });
    }
}

BeyondAllDarkness.id = 'beyond-all-darkness';

module.exports = BeyondAllDarkness;
