const Card = require('../../Card.js');

class LightbringerOutpost extends Card {
    // Action: Put a friendly creature on the bottom of its owner`s deck. If you do, a friendly creature captures 3 Aember.
    setupCardAbilities(ability) {
        this.action({
            effect: '将1个友方生物放到其所有者的牌库底',
            target: {
                cardType: 'creature',
                controller: 'self',
                activePromptTitle: 'Choose a card to move to bottom of deck',
                gameAction: ability.actions.returnToDeck({ bottom: true })
            },
            then: {
                message: '{0} 使用 {1} 抢占3琥珀放在 {2} 上',
                target: {
                    cardType: 'creature',
                    controller: 'self',
                    activePromptTitle: 'Choose a creature to capture amber',
                    gameAction: ability.actions.capture({ amount: 3 })
                }
            }
        });
    }
}

LightbringerOutpost.id = 'lightbringer-outpost';

module.exports = LightbringerOutpost;
