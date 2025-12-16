const Card = require('../../Card.js');

class AFairGame extends Card {
    // Play: Discard the top card of your opponents deck and reveal their hand. You gain 1A for each card of the discarded cards house revealed this way. Your opponent repeats the preceding effect on you.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            effect:
                "弃置 {1}牌库顶的1张卡牌:{2} 并展示其手牌: {3}, 获取 {4} 个琥魄. 然后 {1} 弃置{5}牌库顶的1张卡牌: {6} 并展示其手牌:{7}, 获取 {8} 个琥魄",
            effectArgs: (context) => {
                let oppTop =
                    context.player.opponent.deck.length > 0 ? context.player.opponent.deck[0] : '';
                let oppHand = context.player.opponent.hand.map((card) => card).sort();
                let myTop = context.player.deck.length > 0 ? context.player.deck[0] : '';
                let myHand = context.player.hand.map((card) => card).sort();
                return [
                    context.player.opponent,
                    oppTop,
                    oppHand,
                    oppTop
                        ? oppHand.filter((card) => card.hasHouse(oppTop.printedHouse)).length
                        : 0,
                    context.player,
                    myTop,
                    myHand,
                    myTop ? myHand.filter((card) => card.hasHouse(myTop.printedHouse)).length : 0
                ];
            },
            gameAction: [
                ability.actions.discard(() => ({
                    target: this.game
                        .getPlayers()
                        .filter((player) => player.deck.length > 0)
                        .map((player) => player.deck[0])
                })),
                ability.actions.gainAmber((context) => {
                    let oppTop =
                        context.player.opponent.deck.length > 0
                            ? context.player.opponent.deck[0]
                            : '';
                    if (oppTop) {
                        return {
                            amount: context.player.opponent.hand.filter((card) =>
                                card.hasHouse(oppTop.printedHouse)
                            ).length
                        };
                    }

                    return { amount: 0 };
                }),
                ability.actions.gainAmber((context) => {
                    let myTop = context.player.deck.length > 0 ? context.player.deck[0] : '';
                    if (myTop) {
                        return {
                            target: context.player.opponent,
                            amount: context.player.hand.filter((card) =>
                                card.hasHouse(myTop.printedHouse)
                            ).length
                        };
                    }

                    return { amount: 0 };
                })
            ]
        });
    }
}

AFairGame.id = 'a-fair-game';

module.exports = AFairGame;
