const Card = require('../../Card.js');

class WildBounty extends Card {
    // Enhance AA.
    // Play: The next time you play a card this turn, resolve each of its bonus icons an additional time.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                when: {
                    onCardPlayed: (event) =>
                        event.player === context.player && event.card !== context.source
                },
                message: '{0} 使用 {1} 额外结算 {2} 的奖励图标一次',
                messageArgs: (context) => [context.player, context.source, context.event.card],
                multipleTrigger: false,
                triggeredAbilityType: 'interrupt',
                gameAction: ability.actions.cardLastingEffect((context) => ({
                    until: {
                        onResolveBonusIcons: () => true
                    },
                    target: context.event.card,
                    // We don’t know where the card will be played from, so
                    // we allow any location.
                    allowedLocations: 'any',
                    effect: ability.effects.resolveBonusIconsAdditionalTime()
                }))
            }))
        });
    }
}

WildBounty.id = 'wild-bounty';

module.exports = WildBounty;
