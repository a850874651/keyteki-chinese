const Clock = require('./Clock');

class Timer extends Clock {
    constructor(player, time) {
        super(player, time);
        this.mode = 'down';
    }

    timeRanOut() {
        this.player.game.addMessage("{0}的计时器已超时", this.player);
    }
}

module.exports = Timer;
