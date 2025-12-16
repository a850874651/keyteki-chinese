const Card = require('../../Card.js');

class PredatoryLending extends Card {
    // Play: Exalt and enrage an enemy creature.
    // Fate: Pay your opponent 1 for each enemy Shadows creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'opponent',
                gameAction: [ability.actions.exalt(), ability.actions.enrage()]
            },
            effect: '褒奖并激怒 {0}'
        });

        this.fate({
            effect: '敌方每有1个暗影生物，向对手支付1琥珀',
            gameAction: ability.actions.transferAmber((context) => ({
                amount: context.game.activePlayer.opponent.creaturesInPlay.filter((card) =>
                    card.hasHouse('shadows')
                ).length,
                target: context.game.activePlayer
            }))
        });
    }
}

PredatoryLending.id = 'predatory-lending';

module.exports = PredatoryLending;
