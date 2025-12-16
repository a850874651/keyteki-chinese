const Card = require('../../Card.js');

class VialOfMutation extends Card {
    // Play: Put a Mutation counter on 2 creatures. While those creatures have a mutation counter, they gain the Mutant trait.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'exactly',
                numCards: 2,
                cardType: 'creature',
                gameAction: ability.actions.sequential([
                    ability.actions.addMutationCounter(),
                    ability.actions.cardLastingEffect((context) => ({
                        duration: 'lastingEffect',
                        target: context.target,
                        until: {
                            onAddToken: (event) =>
                                event.card == context.target && !context.target.tokens.mutation,
                            onSwap: (event) =>
                                (event.card == context.target || event.origin == context.target) &&
                                !context.target.tokens.mutation
                        },
                        effect: ability.effects.addTrait('mutant')
                    }))
                ])
            },
            effect: '放置了变异体指示物到 {0} 上, 使其获得了变异体特性'
        });
    }
}

VialOfMutation.id = 'vial-of-mutation';

module.exports = VialOfMutation;
