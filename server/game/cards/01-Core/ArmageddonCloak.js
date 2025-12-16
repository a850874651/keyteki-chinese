const Card = require('../../Card.js');

class ArmageddonCloak extends Card {
    // This creature gains hazardous 2 and, Destroyed: Fully heal this creature and destroy Armageddon Cloak instead.
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: [
                ability.effects.addKeyword({ hazardous: 2 }),
                ability.effects.gainAbility('destroyed', {
                    effect: '治疗{0}所有伤害并摧毁{1}',
                    effectArgs: () => this,
                    gameAction: [
                        ability.actions.heal({ fully: true }),
                        ability.actions.changeEvent((context) => ({
                            event: context.event,
                            card: this,
                            postHandler: (context) => (context.source.moribund = false)
                        })),
                        ability.actions.changeEvent((context) => ({
                            event: context.event.triggeringEvent,
                            destroyedByDamageDealt: false,
                            destroyedFighting: false,
                            card: this
                        }))
                    ]
                })
            ]
        });
    }
}

ArmageddonCloak.id = 'armageddon-cloak';

module.exports = ArmageddonCloak;
