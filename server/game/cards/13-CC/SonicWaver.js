const Card = require('../../Card.js');

class SonicWaver extends Card {
    // At the end of each player's turn, if there are no stunned creatures in play, purge Sonic Waver.
    // Non-Mars creatures enter play stunned.
    // Play: Stun a creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.stun()
            }
        });

        this.persistentEffect({
            targetLocation: 'any',
            targetController: 'any',
            match: (card) => card.type === 'creature' && !card.hasHouse('mars'),
            effect: ability.effects.entersPlayStunned()
        });

        this.interrupt({
            when: {
                onTurnEnd: () => true
            },
            condition: (context) => !context.game.creaturesInPlay.some((card) => card.stunned),
            gameAction: ability.actions.purge((context) => ({
                target: context.source
            })),
            effect: '清除 {0} 因为场上没有被击晕的生物'
        });
    }
}

SonicWaver.id = 'sonic-waver';

module.exports = SonicWaver;
