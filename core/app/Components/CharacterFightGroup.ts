import HeroGroup from './HeroGroup.js';
import GameObject from '../../source/GameObject.js';
import FightController from './FightController.js';
import AttackGroupController from './AttackGroupController.js';
import DamageGroupController from './DamageGroupController.js';
import AttackController from './AttackController.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {extractHealthPoints} from '../indev.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import ItemStorageComponent from './ItemStorageComponent.js';
import {GatheringItemPoint} from './Location.js';
import HealthPoints from './HealthPoints.js';

export default class CharacterFightGroup {
    private readonly _heroGroup: HeroGroup;
    private readonly _attackController: AttackGroupController;
    private readonly _damageController: DamageGroupController;
    private readonly _fightController: FightController;

    //todo: Убрать size и группу. Это объект только для группировки урона и группа тут не нужна.
    constructor() {
        this._heroGroup = new HeroGroup(1000/*todo: Временно. Убрать.*/);
        this._attackController = new AttackGroupController();
        this._damageController = new DamageGroupController();
        this._fightController = new FightController(this._attackController, this._damageController);
    }

    addCharacter(character: GameObject): boolean {
        if (!this._heroGroup.addHero(character)) return false;

        this._attackController.add(character.get<AttackControllerInterface>(ComponentID.AttackController));
        this._damageController.add(character.get<DamageControllerInterface>(ComponentID.DamageController));

        return true;
    }

    removeCharacter(character: GameObject) {
        this._heroGroup.removeHero(character);
        this._attackController.remove(character.get<AttackControllerInterface>(ComponentID.AttackController));
        this._damageController.remove(character.get<DamageControllerInterface>(ComponentID.DamageController));
    }

    attackTo(characterFightGroup: CharacterFightGroup, afterTargetDiedCallback?): void {
        if (!this._fightController.canAttack() || !characterFightGroup._fightController.canAttack()) {
            debug(DebugNamespaceID.Throw)('Одна из групп мертва.');
            return;
        }

        //todo: Здесь FightController должен передавать данные для опыта со всех атакующих.
        // this._fightController.attackTo(characterFightGroup._fightController, afterTargetDiedCallback);
        this._fightController.attackTo(characterFightGroup._fightController, afterTargetDiedCallback);
    }

    canAttack(): boolean {
        return this._fightController.canAttack();
    }

    //todo: @move Пока тут.
    gather(gatheringItemPoints: GatheringItemPoint[], itemStorageComponent: ItemStorageComponent, interval: number) {
        // let partOfMaxPeriodGathering = this._heroGroup.isLifeHeroesCount() / this._heroGroup.size;  //todo: isLifeHeroesCount доступ явно должен быть както иначе сделан, а не в группе. Для общих свойств нужен отдельный класс.
        let partOfMaxPeriodGathering = 0;
        this._heroGroup.map((hero) => {
            partOfMaxPeriodGathering += Number(!hero.get<HealthPoints>(ComponentID.HealthPoints).isDead);
        });
        console.log('partOfMaxPeriodGathering', partOfMaxPeriodGathering);
        for (let i = 0; i < gatheringItemPoints.length; i++) {
            if (!partOfMaxPeriodGathering) continue;

            let count = _.ceil(gatheringItemPoints[i].count.value / gatheringItemPoints[i].count.period * interval * partOfMaxPeriodGathering);
            if (count <= 0) {
                debug(DebugNamespaceID.Warning)('Количество предметов в gatheringItemPoint за период получилось равное или меньше нуля.');
                continue;
            }
            if (itemStorageComponent.addItem(gatheringItemPoints[i].item, count) !== count) {   //todo: Не удобно.
                debug(DebugNamespaceID.Log)(sprintf('Собран предмет: %s (%s). Эффективность сбора: %s', gatheringItemPoints[i].item.name, count, partOfMaxPeriodGathering));
            }
        }
    }
}