const Card = require('../../Card.js');

class WikoliaEvilTwin extends Card {
    // Reap: Exalt Wikolia. Keys cost +4A during your opponent's next turn.
    setupCardAbilities(ability) {
        this.reap({
            gameAction: [
                ability.actions.exalt(),
                ability.actions.duringOpponentNextTurn({
                    targetController: 'any',
                    effect: ability.effects.modifyKeyCost(4)
                })
            ],
            effect: "褒奖 {0} 并+4钥匙费用在 {1} 的下个回合",
            effectArgs: (context) => context.player.opponent
        });
    }
}

WikoliaEvilTwin.id = 'wikolia-evil-twin';

module.exports = WikoliaEvilTwin;
