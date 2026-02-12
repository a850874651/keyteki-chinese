const ActivateProphecyAction = require('./GameActions/ActivateProphecyAction');
const DeactivateProphecyAction = require('./GameActions/DeactivateProphecyAction');
const FulfillProphecyAction = require('./GameActions/FulfillProphecyAction');

class MenuCommands {
    static cardMenuClick(menuItem, game, player, card) {
        switch (menuItem.command) {
            case 'activateProphecy':
                if (game.manualMode && card.isProphecy()) {
                    let activateProphecyAction = new ActivateProphecyAction({
                        prophecyCard: card
                    });
                    let context = game.getFrameworkContext(player);
                    context.source = card;
                    if (activateProphecyAction.canAffect(player, context)) {
                        activateProphecyAction.resolve(player, context);
                    }
                }
                break;
            case 'deactivateProphecy':
                if (game.manualMode && card.isProphecy()) {
                    let deactivateProphecyAction = new DeactivateProphecyAction({
                        prophecyCard: card
                    });
                    let context = game.getFrameworkContext(player);
                    context.source = card;
                    if (deactivateProphecyAction.canAffect(player, context)) {
                        deactivateProphecyAction.resolve(player, context);
                    }
                }
                break;
            case 'fulfillProphecy':
                if (game.manualMode && card.isProphecy()) {
                    let fulfillProphecyAction = new FulfillProphecyAction({ card: card });
                    let context = game.getFrameworkContext(player);
                    context.source = card;
                    // The fulfill prophecy action targets the active player (opponent)
                    if (fulfillProphecyAction.canAffect(game.activePlayer, context)) {
                        fulfillProphecyAction.resolve(game.activePlayer, context);
                    }
                }
                break;
            case 'exhaust':
                if (card.exhausted) {
                    game.addAlert('danger', '{0} 重整了 {1}', player, card);
                    card.ready();
                } else {
                    game.addAlert('danger', '{0} 横置了 {1}', player, card);
                    card.exhaust();
                }

                break;
            case 'addDamage':
                game.addAlert('danger', '{0} 添加了1点伤害给 {1}', player, card);
                card.addToken('damage', 1);
                break;
            case 'remDamage':
                game.addAlert('danger', '{0} 移除了1点伤害从 {1}', player, card);
                card.removeToken('damage', 1);
                break;
            case 'remPower':
                game.addAlert('danger', '{0} 移除了1个1力量标志物从 {1}', player, card);
                card.removeToken('power', 1);
                break;
            case 'addPower':
                game.addAlert('danger', '{0} 添加了1个1力量标志物给 {1}', player, card);
                card.addToken('power', 1);
                break;
            case 'addAmber':
                game.addAlert('danger', '{0} 添加了1个琥珀给 {1}', player, card);
                card.addToken('amber', 1);
                break;
            case 'remAmber':
                game.addAlert('danger', '{0} 移除了1个琥珀从 {1}', player, card);
                card.removeToken('amber', 1);
                break;
            case 'stun':
                if (card.stunned) {
                    game.addAlert('danger', '{0} 移除了 {1} 的击晕', player, card);
                    card.unstun();
                } else {
                    game.addAlert('danger', '{0} 击晕了 {1}', player, card);
                    card.stun();
                }
                break;
            case 'enrage':
                if (!card.enraged) {
                    game.addAlert('danger', '{0} 给 {1} 添加了激怒', player, card);
                    card.addToken('enrage', 1);
                } else {
                    game.addAlert('danger', '{0} 移除了 {1} 的激怒', player, card);
                    card.removeToken('enrage', 1);
                }
                break;
            case 'ward':
                if (!card.warded) {
                    game.addAlert('danger', '{0} 给 {1} 添加了界护', player, card);
                    card.addToken('ward', 1);
                } else {
                    game.addAlert('danger', '{0} 移除了 {1} 的界护', player, card);
                    card.removeToken('ward', 1);
                }
                break;
            case 'control':
                if (player.opponent) {
                    game.addAlert(
                        'danger',
                        '{0} 给 {1} {2}的控制权',
                        player,
                        player.opponent,
                        card
                    );
                    // sets only the default controller, the engine will auto-adjust the controller
                    card.defaultController = player.opponent;
                }

                break;
        }
    }
}

module.exports = MenuCommands;
