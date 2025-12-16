const Card = require('../../Card.js');

class YondarsLog extends Card {
    // Play: If there are more enemy creatures than friendly creatures, archive each card from your hand.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) =>
                context.player.opponent &&
                context.player.opponent.creaturesInPlay.length >
                    context.player.creaturesInPlay.length,
            effect: '归档每张手牌',
            gameAction: ability.actions.archive((context) => ({
                target: context.player.hand
            }))
        });
    }
}

YondarsLog.id = 'yondar-s-log';

module.exports = YondarsLog;
