const Card = require('../../Card.js');

class BondedAuctioneer extends Card {
    // After Reap: Destroy an artifact. If you do, its controller gains 1A.
    //
    // Scrap: Return an artifact to its owner窶冱 hand.
    setupCardAbilities(ability) {
        this.reap({
            effect: '摧毁 {0} 并使 {1} 获得1琥珀',
            effectArgs: (context) => [context.target.controller],
            target: {
                cardType: 'artifact',
                location: 'play area',
                gameAction: ability.actions.destroy()
            },
            then: {
                gameAction: ability.actions.gainAmber((context) => ({
                    target: context.preThenEvent.clone.controller
                }))
            }
        });

        this.scrap({
            target: {
                cardType: 'artifact',
                location: 'play area',
                gameAction: ability.actions.returnToHand()
            }
        });
    }
}

BondedAuctioneer.id = 'bonded-auctioneer';

module.exports = BondedAuctioneer;
