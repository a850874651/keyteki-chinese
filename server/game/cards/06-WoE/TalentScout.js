const Card = require('../../Card.js');

class TalentScout extends Card {
    // Talent Scout may be used as if it belonged to the active house.
    // Play: Look at your opponent's hand and play a creature from it as if it were yours. Your opponent takes control of Talent Scout.
    setupCardAbilities(ability) {
        this.persistentEffect({
            effect: ability.effects.canUse(
                (card, context, effectContext) => card === effectContext.source
            )
        });

        this.play({
            target: {
                cardCondition: (card) => card.type === 'creature',
                controller: 'opponent',
                revealTargets: true,
                location: 'hand',
                gameAction: ability.actions.playCard(),
                effect:
                    "查看对手的手牌并打出其中的1个生物，并把{1}的控制权给你的对手",
                effectArgs: (context) => context.source
            },
            then: {
                alwaysTriggers: true,
                gameAction: [
                    ability.actions.conditional({
                        condition: (context) =>
                            !!context.player.opponent && context.preThenEvents.length === 0,
                        trueGameAction: ability.actions.reveal((context) => ({
                            target: context.player.opponent.hand,
                            chatMessage: true
                        }))
                    }),
                    ability.actions.cardLastingEffect((context) => ({
                        duration: 'lastingEffect',
                        target: this,
                        effect: ability.effects.takeControl(context.player.opponent)
                    }))
                ]
            }
        });
    }
}

TalentScout.id = 'talent-scout';

module.exports = TalentScout;
