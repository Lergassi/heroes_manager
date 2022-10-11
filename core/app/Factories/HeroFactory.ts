import HeroClass from '../Entities/HeroClass.js';
import GameObject from '../../source/GameObject.js';
import HeroComponent from '../Components/HeroComponent.js';
import ExperienceComponent from '../Components/ExperienceComponent.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import EntityManager from '../../source/EntityManager.js';
import EquipSlot from '../Entities/EquipSlot.js';
import CharacterAttributeComponent from '../Components/CharacterAttributeComponent.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import MagicPointsComponent from '../Components/MagicPointsComponent.js';
import AttackPowerComponent from '../Components/AttackPowerComponent.js';
import AppError from '../../source/Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import EquipSlotComponentControllerComponent from '../Components/EquipSlotComponentControllerComponent.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import GameObjectFactory from './GameObjectFactory.js';
import {CharacterAttributeID, unsigned} from '../types.js';
import ExperienceComponentFactory from './ExperienceComponentFactory.js';
import ItemAttributeCollectorComponent from '../Components/ItemAttributeCollectorComponent.js';

// export type HeroFactoryOptions = {
//     idGenerator: IDGeneratorInterface;
//     entityManager: EntityManager;
//     gameObjectFactory: GameObjectFactory;
//     levelComponentFactory: ExperienceComponentFactory;
//     config: {}; //todo: Убрать.
// }

export type HeroFactoryCreateOptions = {
    heroClass: HeroClass;
    level: unsigned;
}

export default class HeroFactory {
    private readonly _gameObjectStorage: GameObjectStorage;
    private readonly _idGenerator: IDGeneratorInterface;
    private readonly _entityManager: EntityManager;
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _experienceComponentFactory: ExperienceComponentFactory;
    private readonly _config: object;

    constructor(
        options: {
            idGenerator: IDGeneratorInterface;
            entityManager: EntityManager;
            gameObjectFactory: GameObjectFactory;
            experienceComponentFactory: ExperienceComponentFactory;
            config: {}; //todo: Убрать.
        },
        // idGenerator: IDGeneratorInterface,
        // entityManager: EntityManager,
        // gameObjectFactory: GameObjectFactory,
        // config: object
    ) {
        this._idGenerator = options.idGenerator;
        this._entityManager = options.entityManager;
        this._gameObjectFactory = options.gameObjectFactory;
        this._gameObjectFactory = options.gameObjectFactory;
        this._experienceComponentFactory = options.experienceComponentFactory;
        this._config = options.config;
    }

    create(options: {
        heroClass: HeroClass;
        level: unsigned;
    }): GameObject {
        //todo: Что значит начальные настройки? Не понятно при срабатывании исключения.
        // if(!this._config['start_hero_values'].hasOwnProperty(heroClass.alias)) {
        if(!this._config['start_hero_values'].hasOwnProperty(options.heroClass.alias)) {
            throw new AppError(sprintf('Начальные настройки для класса "%s" не найдены.', options.heroClass.name));
        }
        
        // let hero = new GameObject(this._idGenerator.generateID());
        // let hero = new GameObject();
        let hero = this._gameObjectFactory.create();

        hero.name = options.heroClass.name;
        hero.addTags('#hero');

        let heroComponent = hero.set('heroComponent', new HeroComponent(
            'Hero',
            options.heroClass,
        ));

        hero.set<ExperienceComponent>(ExperienceComponent.name, this._experienceComponentFactory.create({
            level: options.level,
        }));

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

        let increaseItemCollectorComponent = new ItemAttributeCollectorComponent();
        let equipSlotComponents = [];
        equipSlotAliases.forEach((equipSlotAlias) => {
            let equipSlotComponent = new EquipSlotComponent({
                equipSlot: this._entityManager.getRepository<EquipSlot>(EquipSlot.name).getOneByAlias(equipSlotAlias),
                heroComponent: heroComponent,
                increaseItemCollectorComponent: increaseItemCollectorComponent,
            });
            hero.addComponent(equipSlotComponent);
            hero.set<EquipSlotComponent>(equipSlotAlias, equipSlotComponent);
            equipSlotComponents.push(equipSlotComponent);
            //или
            // hero.get<EquipSlotComponent[]>('equipSlots').push(equipSlotComponent);
            // hero.getComponent('equipSlotManager').addEquipSlot(equipSlotComponent);
            // this.gameObject.addComponent(equipSlotComponent);
            //или
            // let equipSlotComponents = hero.addComponent<EquipSlotComponents>(new EquipSlotComponents(42, hero));
            // equipSlotComponents.set(equipSlotAlias, equipSlotComponent);
        });

        let heroAttributeAliases = [
            CharacterAttributeID.Strength,
            CharacterAttributeID.Agility,
            CharacterAttributeID.Intelligence,
            // 'stamina',
            // 'critical_strike',
            // 'luck',
        ];

        //todo: Настройки.
        hero.set(CharacterAttributeID.Strength, new CharacterAttributeComponent({
            characterAttributeID: CharacterAttributeID.Strength,
            baseValue: 10,
            increaseItemCollector: increaseItemCollectorComponent,
        }));
        hero.set(CharacterAttributeID.Agility, new CharacterAttributeComponent({
            characterAttributeID: CharacterAttributeID.Agility,
            baseValue: 11,
            increaseItemCollector: increaseItemCollectorComponent,
        }));
        hero.set(CharacterAttributeID.Intelligence, new CharacterAttributeComponent({
            characterAttributeID: CharacterAttributeID.Intelligence,
            baseValue: 12,
            increaseItemCollector: increaseItemCollectorComponent,
        }));

        // for (let i = 0; i < heroAttributeAliases.length; i++) {
        //     let characterAttributeComponent = hero.addComponent(new CharacterAttributeComponent(
        //         this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(heroAttributeAliases[i]),
        //         equipSlotComponents,
        //         this._config['start_hero_values'][options.heroClass.alias]['max_health_points'],
        //     ));
        //     hero.set<CharacterAttributeComponent>(heroAttributeAliases[i], characterAttributeComponent);
        // }

        let healthPointsComponent = hero.addComponent(new HealthPointsComponent(
            // this._idGenerator.generateID(),
            // hero,
            this._config['start_hero_values'][options.heroClass.alias]['max_health_points'],
            this._config['start_hero_values'][options.heroClass.alias]['max_health_points'],
        ));
        hero.set<HealthPointsComponent>('healthPointsComponent', healthPointsComponent);

        //todo: Очки магии добавляются только для магов. Магов надо помечать или настраивать для каждого класса по отдельности.
        /*
        Кроме настроек характеристик можно сделать настройки "сборки" на каждый класс. Без логики вида if (isMage) {add(Magic());}. Надо учитывать не только компоненты, но множество одинаковых компонентов типа слоты экипировки.
        Если сделать настройки, то будет много условий. Надо както по другому. Героев с магией всё равно надо както помечать.
        А еще точнее, у классов может быть разный ресурс. Если её нету, то нету. Пока также как с ArmorMaterial у предметов.
         */

        //todo: Сделать настройку для каждого героя.
        let magicPointsComponent = hero.set('magicPointsComponent', new MagicPointsComponent(
            this._config['start_hero_values'][options.heroClass.alias]['max_magic_points'],
            this._config['start_hero_values'][options.heroClass.alias]['max_magic_points'],
        ));

        let attackPowerComponent = hero.set('attackPowerComponent', new AttackPowerComponent(
            this._config['start_hero_values'][options.heroClass.alias]['min_attack_power'],
            this._config['start_hero_values'][options.heroClass.alias]['max_attack_power'],
            options.heroClass.mainCharacterAttributes,
        ));

        //Controllers
        let equipSlotComponentControllerComponent = hero.set('equipSlotComponentControllerComponent',new EquipSlotComponentControllerComponent(
            equipSlotComponents,
        ));

        return hero;
    }
}