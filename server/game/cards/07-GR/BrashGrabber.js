const Card = require('../../Card.js');

class BrashGrabber extends Card {
    // If you are not haunted, Brash Grabber enters play enraged.
    //
    // Omni: Move 1A from an enemy creature to your pool.
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: (context) => !context.player.isHaunted(),
            effect: [ability.effects.entersPlayEnraged()],
            location: 'any'
        });

        this.omni({
            target: {
                activePromptTitle: 'Choose a captured amber to move to your pool.',
                cardCondition: (card) => card.hasToken('amber'),
                cardType: 'creature',
                controller: 'opponent',
                gameAction: ability.actions.returnAmber((context) => ({
                    amount: 1,
                    recipient: context.player
                }))
            },
            effect: '移动1琥珀从 {0} 到其琥珀池中'
        });
    }
}

BrashGrabber.id = 'brash-grabber';

module.exports = BrashGrabber;
