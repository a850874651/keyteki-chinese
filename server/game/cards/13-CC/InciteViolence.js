const Card = require('../../Card.js');

class InciteViolence extends Card {
    // Play: For the remainder of the turn, each friendly creature gains splash-attack 1.
    setupCardAbilities(ability) {
        this.play({
            effect: '在本回合剩余时间内给与每个友方生物溅射1效果',
            gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                target: context.player.creaturesInPlay,
                effect: ability.effects.addKeyword({ 'splash-attack': 1 })
            }))
        });
    }
}

InciteViolence.id = 'incite-violence';

module.exports = InciteViolence;
