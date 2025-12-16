const Card = require('../../Card.js');

class MembershipDrive extends Card {
    // Play: Make a token creature. Gain 1A for each friendly token creature
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.sequential([
                ability.actions.makeTokenCreature(),
                ability.actions.gainAmber((context) => ({
                    amount: context.player.creaturesInPlay.filter((c) => c.isToken()).length
                }))
            ]),
            effect: '制造1个代标生物',
            then: {
                message:
                    '{0} 使用 {1} 获得1琥珀，通过每个代标生物，共获得 {3} 琥珀',
                messageArgs: (context) => [
                    context.player.creaturesInPlay.filter((c) => c.isToken()).length
                ]
            }
        });
    }
}

MembershipDrive.id = 'membership-drive';

module.exports = MembershipDrive;
