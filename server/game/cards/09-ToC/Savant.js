const Card = require('../../Card.js');

class Savant extends Card {
    // Action: You may choose a card in your archives and put it into
    // its owner窶冱 hand. Otherwise, archive a card.
    setupCardAbilities(ability) {
        this.action({
            target: {
                activePromptTitle: 'Put a card from archives into your hand or archive a card',
                controller: 'self',
                location: 'any',
                cardCondition: (card) => card.location === 'archives' || card.location === 'hand',
                gameAction: ability.actions.conditional({
                    condition: (context) =>
                        context.target && context.target.location === 'archives',
                    trueGameAction: ability.actions.returnToHand({ location: 'archives' }),
                    falseGameAction: ability.actions.archive()
                })
            },
            effect: '将1张卡牌放到他的 {1}',
            effectArgs: (context) => [context.target.location === 'archives' ? '手牌' : '档案']
        });
    }
}

Savant.id = 'savant';

module.exports = Savant;
