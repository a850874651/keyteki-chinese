const moment = require('moment');
const { EVENTS } = require('./Events/types');

class TimeLimit {
    constructor(game) {
        this.game = game;
        this.timeLimitStartType = null;
        this.timeLimitStarted = false;
        this.timeLimitStartedAt = null;
        this.timeLimitInMinutes = null;
        this.isTimeLimitReached = false;
    }

    initialiseTimeLimit(timeLimitStartType, timeLimitInMinutes) {
        this.timeLimitStartType = timeLimitStartType;
        this.timeLimitInMinutes = timeLimitInMinutes;
        if (timeLimitStartType === 'whenSetupFinished') {
            this.game.on(EVENTS.onGameStarted, () => this.startTimer());
        }
    }

    startTimer() {
        if (!this.timeLimitStarted) {
            this.timeLimitStarted = true;
            this.timeLimitStartedAt = new Date();
            this.timer = setInterval(() => {
                this.checkForTimeLimitReached();
            }, 1000);
        }
    }

    checkForTimeLimitReached() {
        if (this.game.useGameTimeLimit && !this.isTimeLimitReached) {
            let differenceBetweenStartOfTimerAndNow = moment.duration(
                moment().diff(this.timeLimitStartedAt)
            );
            if (differenceBetweenStartOfTimerAndNow.asSeconds() / 60 >= this.timeLimitInMinutes) {
                this.game.addAlert(
                    '警告',
                    '时间到.  {0} 完成他的回合后, {1} 进行一个回合, 然后 {0} 进行最后一个造钥匙阶段. 如果没有玩家造三把钥匙，破平规则生效按顺序结算: 每个玩家使用6个琥珀制造钥匙 , 最多钥匙玩家胜利, 最多琥珀玩家胜利, 最少枷锁玩家胜利,最多友方生物玩家胜利, 否则先手玩家 -{2} - 获胜.',
                    this.game.activePlayer,
                    this.game.activePlayer.opponent ? this.game.activePlayer.opponent : null,
                    this.game.firstPlayer
                );
                this.isTimeLimitReached = true;
                this.timeLimitStarted = false;
                this.game.timeExpired();
            }
        } else if (this.isTimeLimitReached && this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }
}

module.exports = TimeLimit;
