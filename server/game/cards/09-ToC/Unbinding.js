const Card = require('../../Card.js');
const EventRegistrar = require('../../eventregistrar.js');

class Unbinding extends Card {
    // Play: Make a token creature. If a friendly creature was
    // destroyed this turn, archive Unbinding.
    setupCardAbilities(ability) {
        this.creatureDestroyedControllerUuid = {};
        this.tracker = new EventRegistrar(this.game, this);
        this.tracker.register(['onTurnEnd', 'onCardDestroyed']);

        this.play({
            gameAction: ability.actions.sequential([
                ability.actions.makeTokenCreature(),
                ability.actions.conditional({
                    condition: (context) =>
                        this.creatureDestroyedControllerUuid[context.source.controller.uuid],
                    trueGameAction: ability.actions.archive((context) => ({
                        effect: '归档 {1}',
                        target: context.source
                    }))
                })
            ]),
            effect: '制造1个代标生物{1}{2}',
            effectArgs: (context) =>
                this.creatureDestroyedControllerUuid[context.source.controller.uuid]
                    ? [' 并归档 ', context.source]
                    : ['', '']
        });
    }

    onTurnEnd() {
        this.creatureDestroyedControllerUuid = {};
    }

    onCardDestroyed(event) {
        if (event.clone.type === 'creature') {
            this.creatureDestroyedControllerUuid[event.clone.controller.uuid] = true;
        }
    }
}

Unbinding.id = 'unbinding';

module.exports = Unbinding;
