import HeroGroupComponent from './Components/HeroGroupComponent.js';
import GameObject from '../source/GameObject.js';
import FightController from './Components/FightController.js';
import AttackGroupController from './Components/AttackGroupController.js';
import DamageGroupController from './Components/DamageGroupController.js';
import AttackController from './Components/AttackController.js';
import AttackControllerInterface from './Interfaces/AttackControllerInterface.js';
import DamageControllerInterface from './Interfaces/DamageControllerInterface.js';
import {ComponentID} from '../types/enums/ComponentID.js';
import {extractHealthPoints} from './indev.js';
import debug from 'debug';
import {DebugNamespaceID} from '../types/enums/DebugNamespaceID.js';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import ItemStorageComponent from './Components/ItemStorageComponent.js';
import {GatheringItemPoint} from './Components/LocationComponent.js';

//todo: Нужно как-то показывать от чего зависит класс и что должно быть в GameObject.
export default class CharacterFightGroup {
    private readonly _heroGroup: HeroGroupComponent;
    private readonly _attackController: AttackGroupController;
    private readonly _damageController: DamageGroupController;
    private readonly _fightController: FightController;

    constructor(size) {
        this._heroGroup = new HeroGroupComponent(size);
        this._attackController = new AttackGroupController();
        this._damageController = new DamageGroupController();
        this._fightController = new FightController(this._attackController, this._damageController);
    }

    addCharacter(character: GameObject) {
        this._heroGroup.addHero(character);
        this._attackController.add(character.get<AttackControllerInterface>(ComponentID.AttackController));
        this._damageController.add(character.get<DamageControllerInterface>(ComponentID.DamageController));
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

        this._fightController.attackTo(characterFightGroup._fightController, afterTargetDiedCallback/* todo: Здесь FightController должен передавать данные для опыта со всех атакующих. */);
    }

    canAttack(): boolean {
        return this._fightController.canAttack();
    }

    //todo: @move Пока тут.
    gather(gatheringItemPoints: GatheringItemPoint[], itemStorageComponent: ItemStorageComponent, interval: number) {
        // let partOfMaxPeriodGathering = this._heroGroup.partOfMaxHeroesCount;    //todo: Только живые.
        let partOfMaxPeriodGathering = this._heroGroup.isLifeHeroesCount() / this._heroGroup.size;  //todo: isLifeHeroesCount доступ явно должен быть както иначе сделан, а не в группе. Для общих свойств нужен отдельный класс.
        console.log('partOfMaxPeriodGathering', partOfMaxPeriodGathering);
        for (let i = 0; i < gatheringItemPoints.length; i++) {
            if (!partOfMaxPeriodGathering) continue;

            // console.log('gatheringItemPoints[i].count.value', gatheringItemPoints[i].count.value);
            // console.log('gatheringItemPoints[i].count.period', gatheringItemPoints[i].count.period);
            // console.log('interval', interval);
            // console.log('partOfMaxPeriodGathering', partOfMaxPeriodGathering);
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