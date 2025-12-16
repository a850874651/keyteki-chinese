const { EVENTS } = require('../Events/types');
const GameAction = require('./GameAction');

class ChangeActiveHouseAction extends GameAction {
    setDefaultProperties() {
        this.house = undefined;
        this.player = undefined;
    }

    setup() {
        super.setup();
        if (Array.isArray(this.house)) {
            this.effectMsg = '改变其当前势力';
        } else {
            this.effectMsg = '改变其当前势力为 ' + this.house;
        }
    }

    hasLegalTarget(context) {
        this.update(context);
        return !!this.house && (Array.isArray(this.house) ? this.house.length > 0 : true);
    }

    preEventHandler(context) {
        super.preEventHandler(context);

        // If house is an array with more than one element, prompt for selection
        if (Array.isArray(this.house) && this.house.length > 1) {
            let choices = this.house.map((house) => ({ text: house, icon: house }));
            let handlers = this.house.map((house) => () => {
                this.house = house;
                this.effectMsg = '改变其当前势力为 ' + house;
            });

            context.game.promptWithHandlerMenu(context.player, {
                activePromptTitle: '选择势力',
                context: context,
                choices: choices,
                handlers: handlers
            });
        } else if (Array.isArray(this.house) && this.house.length === 1) {
            // If only one house in array, use it directly
            this.house = this.house[0];
            this.effectMsg = '改变其当前势力为 ' + this.house;
        }
    }

    getEventArray(context) {
        return [
            super.createEvent(EVENTS.unnamedEvent, { house: this.house }, () => {
                if (this.player) {
                    this.player.activeHouse = this.house;
                } else {
                    context.player.activeHouse = this.house;
                }
            })
        ];
    }
}

module.exports = ChangeActiveHouseAction;
