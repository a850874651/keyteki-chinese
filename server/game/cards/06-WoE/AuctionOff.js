const Card = require('../../Card.js');

class AuctionOff extends Card {
    // Play: Purge an artifact. Its controller gains 1Aember.
    setupCardAbilities(ability) {
        this.play({
            effect: '清除 {0} 并使 {1} 获得1琥珀',
            effectArgs: (context) => [context.target?.controller],
            target: {
                cardType: 'artifact',
                location: 'play area',
                gameAction: [
                    ability.actions.purge(),
                    ability.actions.gainAmber((context) => ({
                        target: context.target ? context.target.controller : []
                    }))
                ]
            }
        });
    }
}

AuctionOff.id = 'auction-off';

module.exports = AuctionOff;
