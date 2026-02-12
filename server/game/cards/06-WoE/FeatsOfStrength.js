const Card = require('../../Card.js');

class FeatsOfStrength extends Card {
    // Play: For the remainder of the turn, each time an enemy
    // creature is destroyed in a fight, make a token creature.
    setupCardAbilities(ability) {
        this.play({
            effect:'本回合剩余时间内，每有1个敌方生物在战斗中被摧毁，制造1个代标生物',
            gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                when: {
                    onCardDestroyed: (event) =>
                        event.clone.type === 'creature' &&
                        event.clone.controller !== context.player &&
                        !!event.damageEvent &&
                        !!event.damageEvent.fightEvent
                },
                gameAction: ability.actions.makeTokenCreature()
            }))
        });
    }
}

FeatsOfStrength.id = 'feats-of-strength';

module.exports = FeatsOfStrength;
