const Card = require('../../Card.js');

class LambentMycelium extends Card {
    // After another creature enters play, put two +1 power counters on Lambent Mycelium.
    // Fate: Until the end of your turn, the most powerful enemy creatures gain taunt.
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onCardEntersPlay: (event, context) =>
                    event.card.type === 'creature' && event.card !== context.source
            },
            gameAction: ability.actions.addPowerCounter({ amount: 2 })
        });

        this.fate({
            gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                effect: ability.effects.addKeyword({ taunt: 1 }),
                match: (card) => {
                    const enemyCreatures = context.player.creaturesInPlay;
                    const highestPower =
                        enemyCreatures.length > 0
                            ? Math.max(...enemyCreatures.map((creature) => creature.power))
                            : 0;

                    return (
                        card.type === 'creature' &&
                        card.controller === context.player &&
                        card.power === highestPower
                    );
                }
            })),
            effect: '给与每个力量最高的敌方生物嘲讽效果直到本回合结束'
        });
    }
}

LambentMycelium.id = 'lambent-mycelium';

module.exports = LambentMycelium;
