const Phase = require('../phase.js');
const SimpleStep = require('../simplestep.js');

class KeyPhase extends Phase {
    constructor(game) {
        super(game, 'key');
        this.initialise([new SimpleStep(game, () => this.forgeKey())]);
    }

    forgeKey() {
        if (this.game.activePlayer.canForgeKey()) {
            this.game.actions
                .forgeKey()
                .resolve(
                    this.game.activePlayer,
                    this.game.getFrameworkContext(this.game.activePlayer)
                );

            // Check if player can forge a second key
            if (
                this.game.activePlayer.canForgeKey() &&
                this.game.activePlayer.anyEffect('canForgeSecondKeyDuringKeyPhase')
            ) {
                this.game.actions
                    .forgeKey()
                    .resolve(
                        this.game.activePlayer,
                        this.game.getFrameworkContext(this.game.activePlayer)
                    );
            }
        } else {
            this.game.addMessage(
                '{0}未锻造钥匙. 他有 {1} 琥珀. 他的当前钥匙锻造费用为 {2} 琥珀',
                this.game.activePlayer,
                this.game.activePlayer.amber,
                this.game.activePlayer.getCurrentKeyCost()
            );
        }
    }
}

module.exports = KeyPhase;
