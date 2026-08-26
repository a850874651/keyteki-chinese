const { EVENTS } = require('../Events/types');
const CardGameAction = require('./CardGameAction');

class ArchiveAction extends CardGameAction {
    setDefaultProperties() {
        this.owner = true;
        this.opponent = false;
        this.reveal = false;
    }

    setup() {
        super.setup();
        this.name = 'archive';
        if (
            this.reveal ||
            this.target.every((card) => ['play area', 'discard', 'purged'].includes(card.location))
        ) {
            this.effectMsg = '归档了 {0}';
        } else if (this.target.length === 1) {
            this.effectMsg = '归档了1张卡牌';
        } else {
            this.effectMsg = '归档了 ' + this.target.length.toString() + ' 张卡牌';
        }
    }

    getEvent(card, context) {
        return super.createEvent(
            EVENTS.onCardArchived,
            { card: card, context: context },
            (event) => {
                let player = this.owner
                    ? card.owner
                    : this.opponent
                    ? context.player.opponent
                    : context.player;
                if (card.location === 'play area') {
                    event.leavesPlayEvent = context.game.getEvent(
                        EVENTS.onCardLeavesPlay,
                        { card, context },
                        () => player.moveCard(card, 'archives')
                    );
                    event.addSubEvent(event.leavesPlayEvent);
                } else {
                    player.moveCard(card, 'archives');
                }
            }
        );
    }
}

module.exports = ArchiveAction;
