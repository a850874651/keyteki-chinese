const Card = require('../../Card.js');

class SquireRecruitment extends Card {
    // Play: Make a token creature for each friendly Knight creature.
    setupCardAbilities(ability) {
        this.play({
            effect: '每有1个友方骑士生物，制造1个代标生物',
            gameAction: ability.actions.makeTokenCreature((context) => ({
                amount: context.player.creaturesInPlay.filter((card) => card.hasTrait('knight'))
                    .length
            }))
        });
    }
}

SquireRecruitment.id = 'squire-recruitment';

module.exports = SquireRecruitment;
