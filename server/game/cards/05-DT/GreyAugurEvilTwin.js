const Card = require('../../Card.js');

class GreyAugurEvilTwin extends Card {
    // Each of Grey Augur's neighbors gains, "Reap: Gain 1A and exalt this creature."
    setupCardAbilities(ability) {
        this.persistentEffect({
            targetController: 'any',
            match: (card, context) =>
                card.type === 'creature' && context.source.neighbors.includes(card),
            effect: ability.effects.gainAbility('reap', {
                effect: '获得1琥珀并褒奖{0}',
                gameAction: [ability.actions.gainAmber(), ability.actions.exalt()]
            })
        });
    }
}

GreyAugurEvilTwin.id = 'grey-augur-evil-twin';

module.exports = GreyAugurEvilTwin;
