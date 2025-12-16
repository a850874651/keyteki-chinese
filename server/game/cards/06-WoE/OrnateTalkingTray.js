const Card = require('../../Card.js');

class OrnateTalkingTray extends Card {
    // Omni: Destroy Ornate Talking Tray. Make a token creature.
    setupCardAbilities(ability) {
        this.omni({
            effect: '摧毁 {1} 并制造1个代标生物',
            effectArgs: (context) => context.source,
            gameAction: ability.actions.sequential([
                ability.actions.destroy(),
                ability.actions.makeTokenCreature()
            ])
        });
    }
}

OrnateTalkingTray.id = 'ornate-talking-tray';

module.exports = OrnateTalkingTray;
