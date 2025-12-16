const Card = require('../../Card.js');

class GiltspineNetcasterEvilTwin extends Card {
    // Enhance (PTPT). (These icons have already been added to cards in your deck.)
    // Reap: Ready and use a friendly non-Aquan creature.
    setupCardAbilities(ability) {
        this.reap({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card) => !card.hasTrait('aquan'),
                gameAction: ability.actions.sequential([
                    ability.actions.ready(),
                    ability.actions.use()
                ])
            },
            effect: '重整并使用 {0}'
        });
    }
}

GiltspineNetcasterEvilTwin.id = 'giltspine-netcaster-evil-twin';

module.exports = GiltspineNetcasterEvilTwin;
