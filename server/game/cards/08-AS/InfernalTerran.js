const Card = require('../../Card.js');

class InfernalTerran extends Card {
    // Play/After Reap: Discard a card. Steal 1A.
    //
    // Scrap: Discard your hand. Steal A equal to the number of A
    // bonus icons on the cards discarded this way.
    setupCardAbilities(ability) {
        this.play({
            reap: true,
            gameAction: ability.actions.sequential([
                ability.actions.discard((context) => ({
                    promptForSelect: {
                        controller: 'self',
                        location: 'hand',
                        messageArgs: (card) => [context.player, context.source, card]
                    }
                })),
                ability.actions.steal()
            ]),
            effect: '弃掉1张卡牌并窃取1琥珀'
        });

        this.scrap({
            gameAction: ability.actions.discardEntireLocation((context) => ({
                location: 'hand',
                target: context.player
            })),
            then: {
                message: '{0} 使用 {1} 窃取 {3} 琥珀',
                messageArgs: (context) =>
                    context.preThenCards.reduce(
                        (acc, card) =>
                            acc + card.bonusIcons.filter((icon) => icon === 'amber').length,
                        0
                    ),
                gameAction: ability.actions.steal((context) => ({
                    amount: context.preThenCards.reduce(
                        (acc, card) =>
                            acc + card.bonusIcons.filter((icon) => icon === 'amber').length,
                        0
                    )
                }))
            }
        });
    }
}

InfernalTerran.id = 'infernal-terran';

module.exports = InfernalTerran;
