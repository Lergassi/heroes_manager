import HeroClass from '../Entities/HeroClass.js';
import GameObject from '../../source/GameObject.js';
import HeroComponent from '../Components/HeroComponent.js';
import LevelComponent from '../Components/LevelComponent.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import EntityManager from '../../source/EntityManager.js';
import EquipSlot from '../Entities/EquipSlot.js';
import CharacterAttributeComponent from '../Components/CharacterAttributeComponent.js';
import CharacterAttribute from '../Entities/CharacterAttribute.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import MagicPointsComponent from '../Components/MagicPointsComponent.js';
import AttackPowerComponent from '../Components/AttackPowerComponent.js';
import AppError from '../../source/AppError.js';
import {sprintf} from 'sprintf-js';
import UUIDGenerator from '../../source/UUIDGenerator.js';
import EquipSlotComponentControllerComponent from '../Components/EquipSlotComponentControllerComponent.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import EquipSlotComponents from '../Components/EquipSlotComponents.js';

export default class HeroFactory {
    private readonly _gameObjectStorage: GameObjectStorage;
    private readonly _idGenerator: IDGeneratorInterface;
    private readonly _repositoryManager: EntityManager;
    private readonly _config: object;

    constructor(gameObjectStorage: GameObjectStorage, idGenerator: IDGeneratorInterface, entityManager: EntityManager, config: object) {
        this._gameObjectStorage = gameObjectStorage;
        this._idGenerator = idGenerator;
        this._repositoryManager = entityManager;
        this._config = config;
    }

    create(heroClass: HeroClass): GameObject {
        //todo: Временно. ЧТО ВРЕМЕННО? Переименовать и убрать вообще в другое место.
        //todo: Что значит начальные настройки? Не понятно при срабатывании исключения.
        if(!this._config['start_hero_values'].hasOwnProperty(heroClass.alias)) {
            throw new AppError(sprintf('Начальные настройки для класса "%s" не найдены.', heroClass.name));
        }
        
        let hero = new GameObject(this._idGenerator.generateID());

        hero.name = 'Hero';
        hero.addTags('#hero');

        let heroComponent = hero.addComponent(new HeroComponent(
            this._idGenerator.generateID(),
            hero,
            'Hero',
            heroClass,
        ));
        hero.set<HeroComponent>('heroComponent', heroComponent);

        let levelComponent = hero.addComponent(new LevelComponent(
            this._idGenerator.generateID(),
            hero,
            1,
            this._config['start_hero_values'][heroClass.alias]['max_level'],
            0,
        ));
        hero.set<LevelComponent>('levelComponent', levelComponent);

        let equipSlotAliases = [
            'head',
            'shoulders',
            'chest',
            'wrist',
            'hands',
            'waist',
            'legs',
            'foots',
            'neck',
            'finger_1',
            'finger_2',
            'trinket',   //todo: А если два и более слотов под тринкет будет?
            'right_hand',
            'left_hand',
        ];

        hero.set<EquipSlotComponent[]>('equipSlots', []);
        equipSlotAliases.forEach((equipSlotAlias) => {
            let equipSlotComponent = new EquipSlotComponent(
                this._idGenerator.generateID(),
                hero,
                this._repositoryManager.getRepository<EquipSlot>(EquipSlot.name).getOneByAlias(equipSlotAlias),
            );
            hero.addComponent(equipSlotComponent);
            hero.set<EquipSlotComponent>(equipSlotAlias, equipSlotComponent);   //todo: Потом можно через перезагрузку сделать.
            //или
            // hero.get<EquipSlotComponent[]>('equipSlots').push(equipSlotComponent);
            // hero.getComponent('equipSlotManager').addEquipSlot(equipSlotComponent);
            // this.gameObject.addComponent(equipSlotComponent);
            //или
            // let equipSlotComponents = hero.addComponent<EquipSlotComponents>(new EquipSlotComponents(42, hero));
            // equipSlotComponents.set(equipSlotAlias, equipSlotComponent);
        });

        let heroAttributes = [
            'strength',
            'agility',
            'intelligence',
            'stamina',
            'critical_strike',
            'luck',
        ];

        heroAttributes.forEach((heroAttributeAlias) => {
            let characterAttributeComponent = hero.addComponent(new CharacterAttributeComponent(
                this._idGenerator.generateID(),
                hero,
                this._repositoryManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(heroAttributeAlias),
                this._config['start_hero_values'][heroClass.alias]['max_health_points'],
            ));
            hero.set<CharacterAttributeComponent>(heroAttributeAlias, characterAttributeComponent);
        });

        let healthPointsComponent = hero.addComponent(new HealthPointsComponent(
            this._idGenerator.generateID(),
            hero,
            this._config['start_hero_values'][heroClass.alias]['max_health_points'],
            this._config['start_hero_values'][heroClass.alias]['max_health_points'],
        ));
        hero.set<HealthPointsComponent>('healthPointsComponent', healthPointsComponent);

        //todo: Очки магии добавляются только для магов. Магов надо помечать или настраивать для каждого класса по отдельности.
        /*
        Кроме настроек характеристик можно сделать настройки "сборки" на каждый класс. Без логики вида if (isMage) {add(Magic());}. Надо учитывать не только компоненты, но множество одинаковых компонентов типа слоты экипировки.
        Если сделать настройки, то будет много условий. Надо както по другому. Героев с магией всё равно надо както помечать.
        А еще точнее, у классов может быть разный ресурс. Если её нету, то нету. Пока также как с ArmorMaterial у предметов.
         */

        //todo: Сделать настройку для каждого героя.
        let magicPointsComponent = hero.addComponent(new MagicPointsComponent(
            this._idGenerator.generateID(),
            hero,
            this._config['start_hero_values'][heroClass.alias]['max_magic_points'],
            this._config['start_hero_values'][heroClass.alias]['max_magic_points'],
        ));
        hero.set('magicPointsComponent', magicPointsComponent);

        let attackPowerComponent = hero.addComponent(new AttackPowerComponent(
            this._idGenerator.generateID(),
            hero,
            this._config['start_hero_values'][heroClass.alias]['min_attack_power'],
            this._config['start_hero_values'][heroClass.alias]['max_attack_power'],
            heroClass.mainCharacterAttributes,
        ));
        hero.set('attackPowerComponent', attackPowerComponent);

        //Controllers
        let equipSlotComponentControllerComponent = hero.addComponent<EquipSlotComponentControllerComponent>(new EquipSlotComponentControllerComponent(
            this._idGenerator.generateID(),
            hero,
        ));
        hero.set('equipSlotComponentControllerComponent', equipSlotComponentControllerComponent);

        this._gameObjectStorage.add(hero);

        return hero;
    }
}