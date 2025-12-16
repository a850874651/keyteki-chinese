const GiganticCard = require('../../GiganticCard.js');

class Deusillus extends GiganticCard {
    // (Play only with the other half of Deusillus.)
    // Play: Capture all of your opponents A. Deal 5D to an enemy creature.
    // Fight/Reap: Move 1A from Deusillus to the common supply. Deal 2D to each enemy creature.
    constructor(owner, cardData) {
        super(owner, cardData);
    }

    setupCardAbilities(ability) {
        this.oppAmber = 0;
        super.setupCardAbilities(ability);

        this.play({
            preferActionPromptMessage: true,
            gameAction: ability.actions.sequential([
                ability.actions.capture((context) => {
                    this.oppAmber = context.player.opponent ? context.player.opponent.amber : 0;
                    return {
                        amount: this.oppAmber
                    };
                }),
                ability.actions.dealDamage((context) => ({
                    amount: 5,
                    promptForSelect: {
                        activePromptTitle: 'Choose a creature',
                        cardType: 'creature',
                        controller: 'opponent',
                        message:
                            '{0} 使用 {1} 抢占全部 {2} 琥珀从 {3} 并造成5点伤害对 {4}',
                        messageArgs: (card) => [
                            context.player,
                            context.source,
                            this.oppAmber,
                            context.player.opponent,
                            card
                        ]
                    }
                }))
            ])
        });

        this.fight({
            reap: true,
            message:
                "{0} 使用 {1} 移除 {2} 琥珀从 {1} 并造成2点伤害对 {3} 的全部生物",
            messageArgs: (context) => [
                context.player,
                context.source,
                Math.min(1, context.source.amber),
                context.player.opponent
            ],
            gameAction: ability.actions.sequential([
                ability.actions.removeAmber(),
                ability.actions.dealDamage((context) => ({
                    amount: 2,
                    target: context.player.opponent && context.player.opponent.creaturesInPlay
                }))
            ])
        });
    }
}

Deusillus.id = 'deusillus';

module.exports = Deusillus;
