const Card = require('../../Card.js');

class TokenOfAppreciation extends Card {
    // Play: Make a token creature.
    //
    // Forge a key at +7 Aember current cost, reduced by 1 Aember for
    // each friendly token creature.
    setupCardAbilities(ability) {
        this.play({
            effect:
                '制造1个代标生物并以当前钥匙费用+7锻造1把钥匙，每有1个友方代标生物减少1费用',
            gameAction: ability.actions.sequential([
                ability.actions.makeTokenCreature(),
                ability.actions.forgeKey((context) => ({
                    modifier:
                        7 - context.player.creaturesInPlay.filter((card) => card.isToken()).length
                }))
            ])
        });
    }
}

TokenOfAppreciation.id = 'token-of-appreciation';

module.exports = TokenOfAppreciation;
