const _ = require('underscore');
const Constants = require('../constants.js');
const GameActions = require('./GameActions');
const ManualModePrompt = require('./gamesteps/ManualModePrompt');
const Deck = require('./deck');
const RematchPrompt = require('./gamesteps/RematchPrompt');
const ManualKeyForgePrompt = require('./gamesteps/ManualKeyForgePrompt.js');

class ChatCommands {
    constructor(game) {
        this.game = game;
        this.commands = {
            '/active-house': this.activeHouse,
            '/add-card': this.addCard,
            '/cancel-prompt': this.cancelPrompt,
            '/disconnectme': this.disconnectMe,
            '/draw': this.draw,
            '/discard': this.discard,
            '/discardtopofdeck': this.discardtopofdeck,
            '/forge': this.forge,
            '/tide': this.changeTide,
            '/manual': this.manual,
            '/modify-clock': this.modifyClock,
            '/mulligan': this.mulligan,
            '/mute-spectators': this.muteSpectators,
            '/rematch': this.rematch,
            '/shuffle': this.shuffle,
            '/stop-clocks': this.stopClocks,
            '/start-clocks': this.startClocks,
            '/token': this.setToken,
            '/unforge': this.unforge,
            '/first-player': this.firstPlayer
        };
        this.tokens = ['amber', 'damage', 'enrage', 'power', 'stun', 'ward'];
        this.houses = [...Constants.Houses, 'none'];
    }

    executeCommand(player, command, args) {
        if (!player || !this.commands[command]) {
            return false;
        }

        return this.commands[command].call(this, player, args) !== false;
    }

    addCard(player, args) {
        let location = 'hand';

        switch (args[1]) {
            case 'hand':
                location = 'hand';
                args = args.slice(1);

                break;
            case 'deck':
                location = 'deck';
                args = args.slice(1);

                break;
        }

        let cardName = args.slice(1).join(' ').toLowerCase();
        let card = this.game.cardData[cardName];
        if (!card) {
            card = Object.values(this.game.cardData).find((c) => c.name.toLowerCase() === cardName);
        }

        if (!card) {
            return false;
        }

        let deck = new Deck();
        let preparedCard = deck.createCard(player, card);
        if (!preparedCard) {
            return false;
        }

        preparedCard.setupAbilities();
        preparedCard.applyAnyLocationPersistentEffects();

        player.moveCard(preparedCard, location);

        this.game.allCards.push(preparedCard);

        this.game.addAlert(
            'danger',
            '{0} uses the /add-card command to add {1} to their {2}',
            player,
            preparedCard,
            location
        );

        return true;
    }

    changeTide(player, args) {
        const level = args[1];
        if (!level || !Constants.Tide[level.toUpperCase()]) {
            return false;
        }

        this.game.addAlert('danger', '{0} 正在变更潮位', player);
        this.game.changeTide(player, Constants.Tide[level.toUpperCase()], true);
    }

    forge(player, args) {
        if (Object.values(player.keys).every((key) => key)) {
            return false;
        }

        const color = args[1]
            ? args[1]
            : Object.keys(player.keys).filter((key) => !player.keys[key])[0];

        if (player.keys[color] !== false) {
            return false;
        }

        this.game.addAlert('danger', '{0} 尝试锻造 {1} 钥匙', player, color);
        this.game.queueStep(new ManualKeyForgePrompt(this.game, player, color));

        return true;
    }

    unforge(player, args) {
        if (Object.values(player.keys).every((key) => !key)) {
            return false;
        }

        const color = args[1]
            ? args[1]
            : Object.keys(player.keys).filter((key) => player.keys[key])[0];

        if (player.keys[color] !== true) {
            return false;
        }

        this.game.addAlert('danger', '{0} 熔毁了 {1}', player, `unforgedkey${color}`);
        player.keys[color] = false;
        let forgedKeyIndex = player.keysForgedThisRound.findIndex((key) => key === color);
        if (forgedKeyIndex !== -1) {
            player.keysForgedThisRound.splice(forgedKeyIndex, 1);
        }

        return true;
    }

    activeHouse(player, args) {
        let house = args[1];
        if (!house) {
            return false;
        } else if (!player.activeHouse) {
            this.game.addMessage(
                '{0} 试图变更当前势力为 /active-house, 但他现在不能拥有势力',
                player,
                house
            );
            return false;
        } else if (!this.houses.includes(house.toLowerCase())) {
            this.game.addMessage(
                '{0} 试图变更当前势力为 /active-house, 但 {1} 不是个有效的势力',
                player,
                house
            );
            return false;
        }

        this.game.addAlert(
            'danger',
            '{0} 手动变更了其当前势力为{1}',
            player,
            house
        );
        player.activeHouse = house.toLowerCase();
        return true;
    }

    startClocks(player) {
        this.game.addAlert('danger', '{0} 重启了计时器', player);
        _.each(this.game.getPlayers(), (player) => player.clock.restart());
    }

    stopClocks(player) {
        this.game.addAlert('danger', '{0} 暂停了计时器', player);
        _.each(this.game.getPlayers(), (player) => player.clock.pause());
    }

    modifyClock(player, args) {
        let num = this.getNumberOrDefault(args[1], 60);
        this.game.addAlert('danger', '{0} 增加了 {1} 秒到其计时器', player, num);
        player.clock.modify(num);
    }

    draw(player, args) {
        let num = this.getNumberOrDefault(args[1], 1);
        if (num === 0) {
            return false;
        }
        this.game.addAlert('danger', '{0} 抽取了 {1}张卡牌到其手中', player, num);
        player.drawCardsToHand(num);
        return true;
    }

    discard(player, args) {
        let num = this.getNumberOrDefault(args[1], 1);
        this.game.addAlert(
            'danger',
            '{0} 随机弃掉了{2} {1} 张卡牌{2}',
            player,
            num,
            num > 1 ? '' : ''
        );
        GameActions.discardAtRandom({ amount: num }).resolve(
            player,
            this.game.getFrameworkContext()
        );
    }

    discardtopofdeck(player, args) {
        let num = this.getNumberOrDefault(args[1], 1);
        this.game.addAlert(
            'danger',
            '{0} 从其牌库顶弃掉了 {1} 张卡牌{2} ',
            player,
            num,
            num > 1 ? '' : ''
        );
        GameActions.discardTopOfDeck({ amount: num }).resolve(
            player,
            this.game.getFrameworkContext()
        );
    }

    shuffle(player) {
        this.game.addAlert('danger', '{0} 正在混洗卡组', player);
        player.shuffleDeck();
    }

    mulligan(player) {
        this.game.addAlert('danger', '{0} 重调了手牌', player);
        player.takeMulligan();
    }

    cancelPrompt(player) {
        this.game.addAlert('danger', '{0} 跳过了当前阶段.', player);
        this.game.pipeline.cancelStep();
        this.game.cancelPromptUsed = true;
    }

    setToken(player, args) {
        let token = args[1];
        let num = this.getNumberOrDefault(args[2], 1);

        if (!this.isValidToken(token)) {
            return false;
        }

        this.game.promptForSelect(player, {
            activePromptTitle: 'Select a card',
            waitingPromptTitle: 'Waiting for opponent to set token',
            cardCondition: (card) => card.location === 'play area' && card.controller === player,
            onSelect: (p, card) => {
                let numTokens = card.tokens[token] || 0;
                card.addToken(token, num - numTokens);
                this.game.addAlert(
                    'danger',
                    '{0} uses the /token command to set the {1} token count of {2} to {3}',
                    p,
                    token,
                    card,
                    num - numTokens
                );
                return true;
            }
        });

        return true;
    }

    reveal(player) {
        this.game.promptForSelect(player, {
            activePromptTitle: 'Select a card',
            cardCondition: (card) => card.facedown && card.controller === player,
            onSelect: (player, card) => {
                card.facedown = false;
                this.game.addAlert('danger', '{0} 展示了 {1}', player, card);
                return true;
            }
        });
    }

    disconnectMe(player) {
        player.socket.disconnect();
    }

    manual(player) {
        if (this.game.manualMode) {
            this.game.manualMode = false;
            this.game.addAlert('danger', '{0} 关闭了手动模式', player);
        } else if (this.game.lastManualMode !== player) {
            this.game.addAlert('danger', '{0} 尝试开启手动模式', player);
            this.game.queueStep(new ManualModePrompt(this.game, player));
        }
    }

    muteSpectators(player) {
        this.game.muteSpectators = !this.game.muteSpectators;

        this.game.addAlert(
            'warning',
            '{0} {1}禁言了观战者',
            player,
            this.game.muteSpectators ? '' : 'un'
        );
    }

    getNumberOrDefault(string, defaultNumber) {
        let num = parseInt(string);

        if (isNaN(num)) {
            num = defaultNumber;
        }

        if (num < 0) {
            num = defaultNumber;
        }

        return num;
    }

    isValidToken(token) {
        if (!token) {
            return false;
        }

        let lowerToken = token.toLowerCase();

        return _.contains(this.tokens, lowerToken);
    }

    rematch(player) {
        if (this.game.finishedAt) {
            this.game.addAlert('info', '{0} 请求再次对局', player);
        } else {
            this.game.addAlert(
                'danger',
                '{0} 请求再次对局.  当前对局未结束',
                player
            );
        }

        this.game.queueStep(new RematchPrompt(this.game, player));
    }

    firstPlayer(player, args) {
        const firstPlayerName = args[1];
        if (this.game.startingHandsDrawn) {
            this.game.addAlert('danger', '在游戏的这个阶段无法修改先手玩家');
            return;
        }

        const players = this.game.getPlayers();

        for (const p of players) {
            if (p.name === firstPlayerName) {
                this.game.activePlayer = p;
                this.game.addAlert('info', '{0} 变更先手玩家为 {1}', player, p);
                return;
            }
        }
        this.game.addAlert(
            'danger',
            '无法变更先手玩家: 玩家 {0} 不存在',
            firstPlayerName
        );
    }
}

module.exports = ChatCommands;
