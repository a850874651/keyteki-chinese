const Card = require('../../Card.js');

class CurseOfFertility extends Card {
    // Treachery. (This card enters play under your opponent窶冱 control.)
    //
    // At the end of your turn, if you did not play a creature this
    // turn, your opponent gains 1.
    setupCardAbilities(ability) {
        this.interrupt({
            when: {
                onTurnEnd: (_, context) =>
                    context.player === this.game.activePlayer &&
                    !!context.player.opponent &&
                    this.game.cardsPlayed.filter((card) => card.type === 'creature').length === 0
            },
            gameAction: ability.actions.gainAmber((context) => ({
                target: context.player.opponent
            })),
            effect: '使得 {1} 获得1琥珀',
            effectArgs: (context) => [context.player.opponent]
        });
    }
}

CurseOfFertility.id = 'curse-of-fertility';

module.exports = CurseOfFertility;
