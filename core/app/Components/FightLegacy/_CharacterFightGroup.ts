import {assertNotNil} from '../../../source/assert.js';
import HeroGroup from '../HeroGroup.js';
import GameObject from '../../../source/GameObject.js';
import _CharacterFightController from './_CharacterFightController.js';
import AttackGroupController from '../AttackGroupController.js';
import DamageGroupController from '../DamageGroupController.js';
import AttackController from '../AttackController.js';
import AttackControllerInterface from '../../Interfaces/AttackControllerInterface.js';
import DamageControllerInterface from '../../Interfaces/DamageControllerInterface.js';
import {ComponentID} from '../../../types/enums/ComponentID.js';
import {extractHealthPoints} from '../../indev.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import ItemStorageComponent from '../ItemStorages/ItemStorageComponent.js';
import {GatheringItemPoint} from '../Location.js';
import HealthPoints from '../HealthPoints.js';

export default class _CharacterFightGroup {
    private readonly _attackController: AttackGroupController;
    private readonly _damageController: DamageGroupController;
    private readonly _fightController: _CharacterFightController;

    constructor() {
        this._attackController = new AttackGroupController();
        this._damageController = new DamageGroupController();
        this._fightController = new _CharacterFightController(this._attackController, this._damageController);
    }

    addCharacter(character: GameObject): boolean {
        assertNotNil(character);

        this._attackController.add(character.get<AttackControllerInterface>(ComponentID.AttackController));
        this._damageController.add(character.get<DamageControllerInterface>(ComponentID.DamageController));

        return true;
    }

    removeCharacter(character: GameObject): boolean {
        assertNotNil(character);

        this._attackController.remove(character.get<AttackControllerInterface>(ComponentID.AttackController));
        this._damageController.remove(character.get<DamageControllerInterface>(ComponentID.DamageController));

        return true;
    }

    attackTo(targetCharacterFightGroup: _CharacterFightGroup, afterTargetDiedCallback?): void {
        if (!this._fightController.canAttack() || !targetCharacterFightGroup._fightController.canAttack()) {
            debug(DebugNamespaceID.Throw)('Все герои группы мертвы.');
            return;
        }

        //todo: Здесь FightController должен передавать данные для опыта со всех атакующих.
        // this._fightController.attackTo(targetCharacterFightGroup._fightController, afterTargetDiedCallback);
        this._fightController.attackTo(targetCharacterFightGroup._fightController, afterTargetDiedCallback);
    }

    canAttack(): boolean {
        return this._fightController.canAttack();
    }
}