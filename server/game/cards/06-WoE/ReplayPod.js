const Card = require('../../Card.js');

class ReplayPod extends Card {
    // Each friendly Mars creature gains "Destroyed: Place this
    // creature facedown under Replay Pod."
    //
    // Action: Put each card under Replay Pod into your hand. Purge Replay Pod.
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: (card) => card.type === 'creature' && card.hasHouse('mars'),
            effect: ability.effects.gainAbility('destroyed', {
                gameAction: ability.actions.placeUnder({
                    parent: this,
                    facedown: true
                })
            })
        });

        this.action({
            effect: '将其下方的卡牌返回手中并清除 {0}',
            gameAction: [
                ability.actions.returnToHand((context) => ({
                    location: 'under',
                    target: context.source.childCards
                })),
                ability.actions.purge()
            ]
        });
    }
}

ReplayPod.id = 'replay-pod';

module.exports = ReplayPod;
