const { EVENTS } = require('../../Events/types.js');
const Phase = require('../phase.js');
const SimpleStep = require('../simplestep.js');

class HousePhase extends Phase {
    constructor(game) {
        super(game, 'house');
        this.initialise([
            new SimpleStep(game, () => this.chooseHouse()),
            new SimpleStep(game, () => this.takeCardsFromArchives())
        ]);
    }

    chooseHouse() {
        let choices = this.game.activePlayer.getAvailableHouses().map((house) => {
            return { text: house, icon: house };
        });
        if (choices.length > 0) {
            this.game.promptWithHandlerMenu(this.game.activePlayer, {
                promptTitle: 'Choose Active House',
                activePromptTitle: 'Choose which house you want to activate this turn',
                source: 'House Choice',
                choices: choices,
                choiceHandler: (house) => {
                    this.game.addMessage(
                        '{0} 选择了 {1} 作为这个回合的当前势力',
                        this.game.activePlayer,
                        house.text
                    );
                    this.game.raiseEvent(
                        EVENTS.onChooseActiveHouse,
                        { player: this.game.activePlayer, house: house.text },
                        () => (this.game.activePlayer.activeHouse = house.text)
                    );
                }
            });
        } else {
            this.game.addMessage(
                '{0} 这个回合没有合法的当前势力可供选择, 所以必须以无当前势力来进行',
                this.game.activePlayer
            );
        }
    }

    takeCardsFromArchives() {
        if (!this.game.activePlayer.checkRestrictions('takeArchives')) {
            return;
        }

        if (this.game.activePlayer.archives.length) {
            let oppCannotLeave = this.game.activePlayer.anyEffect(
                'opponentCardsCannotLeaveArchives'
            );
            let theyOwn = '';
            if (oppCannotLeave) {
                theyOwn = ' they own';
            }
            if (this.game.activePlayer.anyEffect('chooseCardsFromArchives')) {
                this.game.promptForSelect(this.game.activePlayer, {
                    optional: true,
                    numCards: 0,
                    multiSelect: true,
                    activePromptTitle: 'Do you wish to take cards in archives into your hand?',
                    location: 'any',
                    controller: 'self',
                    buttons: [{ text: 'All Cards', arg: 'all' }],
                    cardCondition: (card) =>
                        card.location === 'archives' &&
                        card.controller === this.game.activePlayer &&
                        (!oppCannotLeave || card.owner === this.game.activePlayer),
                    source: this.game.activePlayer.mostRecentEffect('chooseCardsFromArchives'),
                    onMenuCommand: (player, arg) => {
                        if (arg === 'all') {
                            this.game.addMessage(
                                '{0} 从档案中提取了所有卡牌{1} 加入手中',
                                this.game.activePlayer,
                                theyOwn
                            );
                            for (let card of this.game.activePlayer.archives) {
                                if (oppCannotLeave && card.owner !== this.game.activePlayer) {
                                    continue;
                                }
                                this.game.activePlayer.moveCard(card, 'hand');
                            }
                            this.game.raiseEvent(EVENTS.onArchivesAddedToHand, {
                                player: this.game.activePlayer
                            });
                            return true;
                        }
                    },
                    onSelect: (player, cardParam) => {
                        if (cardParam) {
                            this.game.addMessage(
                                '{0} 将档案中的卡牌{1} 加入手中',
                                this.game.activePlayer,
                                theyOwn
                            );
                            for (let card of cardParam) {
                                if (oppCannotLeave && card.owner !== this.game.activePlayer) {
                                    continue;
                                }
                                this.game.activePlayer.moveCard(card, 'hand');
                            }
                            if (this.game.activePlayer.archives.length === 0) {
                                this.game.raiseEvent(EVENTS.onArchivesAddedToHand, {
                                    player: this.game.activePlayer
                                });
                            }
                        }
                        return true;
                    }
                });
            } else {
                this.game.promptWithHandlerMenu(this.game.activePlayer, {
                    source: 'Access Archives',
                    activePromptTitle:
                        'Do you wish to take all the cards in archives into your hand?',
                    choices: ['Yes', 'No'],
                    handlers: [
                        () => {
                            this.game.addMessage(
                                '{0} 从档案中提取了所有卡牌{1} 加入手中',
                                this.game.activePlayer,
                                theyOwn
                            );
                            for (let card of this.game.activePlayer.archives) {
                                if (oppCannotLeave && card.owner !== this.game.activePlayer) {
                                    continue;
                                }
                                this.game.activePlayer.moveCard(card, 'hand');
                            }
                            this.game.raiseEvent(EVENTS.onArchivesAddedToHand, {
                                player: this.game.activePlayer
                            });
                        },
                        () => true
                    ]
                });
            }
        }
    }
}

module.exports = HousePhase;
