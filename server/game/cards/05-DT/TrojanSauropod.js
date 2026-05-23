const Card = require('../../Card.js');

class TrojanSauropod extends Card {
    // Trojan Sauropod enters play under your opponent窶冱 control.
    // Omni: Gain 3A. Your opponent reveals their hand and puts each creature from it into play ready, then refills their hand as if it were their "draw cards" step. Destroy Trojan Sauropod.
    setupCardAbilities(ability) {
        this.persistentEffect({
            location: 'any',
            effect: ability.effects.entersPlayUnderOpponentsControl()
        });

        this.omni({
            effect: "获得3琥珀, 展示对手的手牌 {1} 并打出其中的每个生物",
            effectArgs: (context) =>
                context.player.opponent ? [context.player.opponent.hand] : [],
            gameAction: ability.actions.gainAmber({ amount: 3 }),
            then: {
                condition: (context) => context.player.opponent,
                gameAction: ability.actions.sequentialPutIntoPlay((context) => {
                    const hand = context.player.opponent ? context.player.opponent.hand : [];
                    const creatures = hand.filter((card) => card.type === 'creature');
                    return {
                        revealList: hand,
                        forEach: creatures,
                        ready: true,
                        numPlayAllowances: creatures.length
                    };
                }),
                then: {
                    alwaysTriggers: true,
                    gameAction: [
                        ability.actions.draw((context) => ({
                            refill: true,
                            target: context.player.opponent
                        })),
                        ability.actions.destroy()
                    ]
                }
            }
        });
    }
}

TrojanSauropod.id = 'trojan-sauropod';

module.exports = TrojanSauropod;
