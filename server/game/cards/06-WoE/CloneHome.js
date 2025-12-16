const Card = require('../../Card.js');

class CloneHome extends Card {
    // Play: Make a token creature. If there are more friendly
    // creatures than enemy creatures, archive Clone Home.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.sequential([
                ability.actions.makeTokenCreature(),
                ability.actions.conditional({
                    condition: (context) =>
                        !!context.player.opponent &&
                        context.player.creaturesInPlay.length >
                            context.player.opponent.creaturesInPlay.length,
                    trueGameAction: ability.actions.archive((context) => ({
                        target: context.source
                    }))
                })
            ]),
            effect: '制造1个代标生物{1}{2}',
            effectArgs: (context) =>
                !!context.player.opponent &&
                context.player.creaturesInPlay.length >
                    context.player.opponent.creaturesInPlay.length
                    ? [' 并归档 ', context.source]
                    : ['', '']
        });
    }
}

CloneHome.id = 'clone-home';

module.exports = CloneHome;
