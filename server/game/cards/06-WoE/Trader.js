const Card = require('../../Card.js');

class Trader extends Card {
    //Action: Steal 1A icon. Destroy Trader.
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.sequential([
                ability.actions.steal(),
                ability.actions.destroy()
            ]),
            effect: '窃取1琥珀并摧毁{0}'
        });
    }
}

Trader.id = 'trader';

module.exports = Trader;
