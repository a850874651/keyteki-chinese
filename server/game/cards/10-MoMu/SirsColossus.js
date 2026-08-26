const GiganticCard = require('../../GiganticCard.js');

class SirsColossus extends GiganticCard {
    // (Play only with the other half of Sirs Colossus.)
    // Play: Capture all your opponent窶冱 A, distributed
    // among any number of friendly creatures.
    // After Fight: Move all A from a friendly creature to the common supply.
    constructor(owner, cardData) {
        super(owner, cardData);
    }

    setupCardAbilities(ability) {
        super.setupCardAbilities(ability);

        this.play({
            effect: "抢占 {1}的全部琥珀到友方生物上",
            effectArgs: (context) => [context.player.opponent],
            gameAction: ability.actions.allocateCapture((context) => ({
                numAmber: context.player.opponent ? context.player.opponent.amber : 0,
                controller: 'self',
                menuTitle: 'Choose a creature to capture 1 amber'
            }))
        });

        this.fight({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.removeAmber({ all: true })
            }
        });
    }
}

SirsColossus.id = 'sirs-colossus';

module.exports = SirsColossus;
