import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import EnemyFactory from '../Factories/EnemyFactory.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {assertNotNil} from '../../source/assert.js';
import _CharacterFightController from '../Components/FightLegacy/_CharacterFightController.js';
import AttackController from '../Components/AttackController.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {CommandID} from '../../types/enums/CommandID.js';

export default class FightCommand extends Command {
    get name(): string {
        return CommandID.fight;
    }

    configure() {
        super.configure();
        this.addArgument('hero_id', '', true);
        // this.addArgument('enemy_id', '', true);
    }

    async execute(input: Input) {
        let heroID = parseInt(input.getArgument('hero_id'), 10);
        let hero = this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(heroID);
        assertNotNil(hero);
        console.log(hero);

        let enemy = this.container.get<EnemyFactory>(ServiceID.EnemyFactory).create(EnemyTypeID.Bear, 1, {
            baseCharacterAttributeValues: {
                [CharacterAttributeID.AttackPower]: 1000,
            },
        });
        console.log(enemy);

        let heroAttackController = new _CharacterFightController(
            hero.get<AttackController>(ComponentID.AttackController),
            hero.get<DamageControllerInterface>(ComponentID.DamageController),
        );
        let enemyAttackController = new _CharacterFightController(
            enemy.get<AttackController>(ComponentID.AttackController),
            enemy.get<DamageControllerInterface>(ComponentID.DamageController),
        );
        console.log(heroAttackController);
        console.log(enemyAttackController);

        // heroAttackController.hit(enemyAttackController);
        // heroAttackController.fightToDead(enemyAttackController);
        // enemyAttackController.fightToDead(heroAttackController);
    }
}