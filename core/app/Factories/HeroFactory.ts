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
import GameObjectStorage from '../../source/GameObjectStorage.js';
import GameObjectFactory from './GameObjectFactory.js';
import {EquipSlotComponentsType, unsigned} from '../types.js';
import ExperienceComponentFactory from './ExperienceComponentFactory.js';
import ItemAttributeCollectorComponent from '../Components/ItemAttributeCollectorComponent.js';
import TakeComponent from '../Components/TakeComponent.js';
import _ from 'lodash';
import HeroAttributeCollectorComponent from '../Components/HeroAttributeCollectorComponent.js';
import CharacterAttributeValueGenerator from '../Services/CharacterAttributeValueGenerator.js';
import CharacterAttributeRawValueCollectorComponent from '../Components/CharacterAttributeRawValueCollectorComponent.js';
import TotalCharacterAttributeValueCollectorComponent
    from '../Components/TotalCharacterAttributeValueCollectorComponent.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';

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
    private readonly _entityManager: EntityManager;
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _experienceComponentFactory: ExperienceComponentFactory;
    private readonly _config: object;

    constructor(
        options: {
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
        this._entityManager = options.entityManager;
        this._gameObjectFactory = options.gameObjectFactory;
        this._experienceComponentFactory = options.experienceComponentFactory;
        this._config = options.config;
    }

    create(options: {
        heroClass: HeroClass;
        level: unsigned;
    }): GameObject {
        //todo: Что значит начальные настройки? Не понятно при срабатывании исключения.
        //todo: Переделать. Настройки будут генерироваться случайно по алгоритму.
        if(!this._config['start_hero_values'].hasOwnProperty(options.heroClass.alias)) {
            throw new AppError(sprintf('Начальные настройки для класса "%s" не найдены.', options.heroClass.name));
        }
        
        // let hero = new GameObject(this._idGenerator.generateID());
        // let hero = new GameObject();
        let hero = this._gameObjectFactory.create();

        hero.name = 'Hero: ' + options.heroClass.name;
        hero.addTags('#hero');

        let heroComponent = hero.set('heroComponent', new HeroComponent(
            options.heroClass.name,
            options.heroClass,
        ));

        hero.set<ExperienceComponent>(ExperienceComponent.name, this._experienceComponentFactory.create({
            level: options.level,
        }));

        let equipSlotIDs = [
            EquipSlotID.Head,
            EquipSlotID.Shoulders,
            EquipSlotID.Chest,
            EquipSlotID.Wrist,
            EquipSlotID.Hands,
            EquipSlotID.Waist,
            EquipSlotID.Legs,
            EquipSlotID.Foots,
            EquipSlotID.Neck,
            EquipSlotID.Finger_1,
            EquipSlotID.Finger_2,
            EquipSlotID.Trinket,
            EquipSlotID.RightHand,
            EquipSlotID.LeftHand,
        ];

        let itemAttributeCollectorComponent = new ItemAttributeCollectorComponent();
        hero.set(ItemAttributeCollectorComponent.name, itemAttributeCollectorComponent);

        let heroAttributeCollectorComponent = new HeroAttributeCollectorComponent();
        // hero.set(HeroAttributeCollectorComponent.name, heroAttributeCollectorComponent);

        let characterAttributeCollectorComponent = new CharacterAttributeRawValueCollectorComponent();
        hero.set(CharacterAttributeRawValueCollectorComponent.name, characterAttributeCollectorComponent);

        let totalCharacterAttributeValueCollectorComponent = new TotalCharacterAttributeValueCollectorComponent({
            characterAttributeValueCollectorComponent: characterAttributeCollectorComponent,
            itemAttributeCollectorComponent: itemAttributeCollectorComponent,
        });
        hero.set(TotalCharacterAttributeValueCollectorComponent.name, totalCharacterAttributeValueCollectorComponent);

        let equipSlotComponents: EquipSlotComponentsType = {};
        equipSlotIDs.forEach((equipSlotID) => {
            let equipSlotComponent = new EquipSlotComponent({
                equipSlot: this._entityManager.getRepository<EquipSlot>(EquipSlot.name).getOneByAlias(equipSlotID),
                heroComponent: heroComponent,
                itemAttributeCollectorComponent: itemAttributeCollectorComponent,
            });
            hero.addComponent(equipSlotComponent);
            hero.set<EquipSlotComponent>(equipSlotID, equipSlotComponent);
            // equipSlotComponents.push(equipSlotComponent);
            equipSlotComponents[equipSlotID] = equipSlotComponent;
            //или
            // hero.get<EquipSlotComponent[]>('equipSlots').push(equipSlotComponent);
            // hero.getComponent('equipSlotManager').addEquipSlot(equipSlotComponent);
            // this.gameObject.addComponent(equipSlotComponent);
            //или
            // let equipSlotComponents = hero.addComponent<EquipSlotComponents>(new EquipSlotComponents(42, hero));
            // equipSlotComponents.set(equipSlotID, equipSlotComponent);
        });
        hero.set<EquipSlotComponentsType>('EquipSlotComponentsType', equipSlotComponents);

        let heroAttributeAliases = [
            CharacterAttributeID.Strength,
            CharacterAttributeID.Agility,
            CharacterAttributeID.Intelligence,
            // 'stamina',
            // 'critical_strike',
            // 'luck',
        ];

        // let characterAttributeGenerator = (ID: CharacterAttributeID) => {
        //     let value = 0;
        //     switch (ID) {
        //         case
        //     }
        // }

        // let characterAttributeValueGenerators = {
        //     [CharacterAttributeID.Strength]: new StrengthValueGenerator(),
        //     [CharacterAttributeID.Agility]: new AgilityValueGenerator(),
        //     [CharacterAttributeID.Intelligence]: new IntelligenceValueGenerator(),
        //     [CharacterAttributeID.AttackPower]: new AttackPowerValueGenerator(),
        // };

        let characterAttributeValueFactory = new CharacterAttributeValueGenerator();

        let mainCharacterAttributeMultiplier = 2;
        // heroAttributeCollectorComponent.addCharacterAttributeComponent({
        //     ID: CharacterAttributeID.Strength,
        //     characterAttributeComponent: hero.set(CharacterAttributeID.Strength, characterAttributeValueGenerators[CharacterAttributeID.Strength].create({
        //         level: 1,
        //         isMain: options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Strength),
        //         itemAttributeCollectorComponent: itemAttributeCollectorComponent,
        //     })),
        // });
        // heroAttributeCollectorComponent.addCharacterAttributeComponent({
        //     ID: CharacterAttributeID.Agility,
        //     characterAttributeComponent: hero.set(CharacterAttributeID.Agility, characterAttributeValueGenerators[CharacterAttributeID.Agility].create({
        //         level: 1,
        //         isMain: options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Agility),
        //         itemAttributeCollectorComponent: itemAttributeCollectorComponent,
        //     })),
        // });
        // heroAttributeCollectorComponent.addCharacterAttributeComponent({
        //     ID: CharacterAttributeID.Intelligence,
        //     characterAttributeComponent: hero.set(CharacterAttributeID.Intelligence, characterAttributeValueGenerators[CharacterAttributeID.Intelligence].create({
        //         level: 1,
        //         isMain: options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Intelligence),
        //         itemAttributeCollectorComponent: itemAttributeCollectorComponent,
        //     })),
        // });
        /*
            todo: Переделать в ооп когда будут все характеристики и больше логики.
                mainCharacterAttributeMultiplier разный на каждый атрибут.
                Диапазон генерации (6, 9) тоже разный. В том числе он разный для каждого класса: например у мага х2 инт, у роги х2 лов, но у стрелка или пала не значит что сил и инт х2. На каждый класс по фабрике? Классов до 100 планируется... У каждого класса своя логика. GunslingerCharacterAttributeGenerator? Т.е. не на каждый атрибут, а в целом для атридиутов. И уже внутри переопределять.
                _.random(6, 9) * (options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Strength) ? mainCharacterAttributeMultiplier : 1) - должно быть в одном одном месте. При изменении приходиться менять все строки.
                Как сделать отдельные классы для не главных атрибутов? Там немного другая логика. Они не могут быть главной. Это нужно решать выше. В CharacterAttributeComponent нужно передавать уже сформированное значение. Компоненту не важно - главаный он или нет.
                    Например при увеличении значение генериуется вне его. Т.е. при increaseBaseValue(value) если внутри у силы будет отдельная логика поведение будет... Хотя нет. наоборот поведение должно быть задано. Но тогда increaseBaseValue(10) приведет не к увеличению на 10, а на 100 например.
                    А если я хочу просто увеличить значение без учета логики класса? Просто добавить значения. Я не смогу отменить логику внутри класса. А за разницу роста главных характеристик пусть отвечает другой класс. Получается isMain не нужен.
                (6, 9) и прочие подобные значения передавать из вне или внутри задавать?
         */
        hero.set(CharacterAttributeID.Strength, new CharacterAttributeComponent({
            characterAttributeID: CharacterAttributeID.Strength,
            characterAttributeCollectorComponent: characterAttributeCollectorComponent,
        }));
        //todo: Все настройки героев в отдельную логику. В фабрике можно оставить только нулевые значения.
        hero.get<CharacterAttributeComponent>(CharacterAttributeID.Strength).addBaseValue(characterAttributeValueFactory.generate({
            level: options.level,
            characterAttributeID: CharacterAttributeID.Strength,
        }) * (options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Strength) ? mainCharacterAttributeMultiplier : 1));

        hero.set(CharacterAttributeID.Agility, new CharacterAttributeComponent({
            characterAttributeID: CharacterAttributeID.Agility,
            characterAttributeCollectorComponent: characterAttributeCollectorComponent,
        }));
        hero.get<CharacterAttributeComponent>(CharacterAttributeID.Agility).addBaseValue(characterAttributeValueFactory.generate({
            level: options.level,
            characterAttributeID: CharacterAttributeID.Agility,
        }) * (options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Agility) ? mainCharacterAttributeMultiplier : 1));

        hero.set(CharacterAttributeID.Intelligence, new CharacterAttributeComponent({
            characterAttributeID: CharacterAttributeID.Intelligence,
            characterAttributeCollectorComponent: characterAttributeCollectorComponent,
        }));
        hero.get<CharacterAttributeComponent>(CharacterAttributeID.Intelligence).addBaseValue(characterAttributeValueFactory.generate({
            level: options.level,
            characterAttributeID: CharacterAttributeID.Intelligence,
        }) * (options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Intelligence) ? mainCharacterAttributeMultiplier : 1));

        hero.set(CharacterAttributeID.AttackPower, new CharacterAttributeComponent({
            characterAttributeID: CharacterAttributeID.AttackPower,
            characterAttributeCollectorComponent: characterAttributeCollectorComponent,
        }));
        hero.get<CharacterAttributeComponent>(CharacterAttributeID.AttackPower).addBaseValue(characterAttributeValueFactory.generate({
            level: options.level,
            characterAttributeID: CharacterAttributeID.AttackPower,
        }));
        // heroAttributeCollectorComponent.addCharacterAttributeComponent({
        //     ID: CharacterAttributeID.AttackPower,
        //     characterAttributeComponent: hero.set(CharacterAttributeID.AttackPower, characterAttributeValueGenerators[CharacterAttributeID.AttackPower].create({
        //         level: 1,
        //         itemAttributeCollectorComponent: itemAttributeCollectorComponent,
        //     })),
        // });

        // for (let i = 0; i < heroAttributeAliases.length; i++) {
        //     let characterAttributeComponent = hero.addComponent(new CharacterAttributeComponent(
        //         this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(heroAttributeAliases[i]),
        //         equipSlotComponents,
        //         this._config['start_hero_values'][options.heroClass.alias][CharacterAttributeID.MaxHealthPoints],
        //     ));
        //     hero.set<CharacterAttributeComponent>(heroAttributeAliases[i], characterAttributeComponent);
        // }

        let healthPointsComponent = hero.addComponent(new HealthPointsComponent(
            // this._idGenerator.generateID(),
            // hero,
            this._config['start_hero_values'][options.heroClass.alias][CharacterAttributeID.MaxHealthPoints],
            this._config['start_hero_values'][options.heroClass.alias][CharacterAttributeID.MaxHealthPoints],
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
            this._config['start_hero_values'][options.heroClass.alias][CharacterAttributeID.MaxMagicPoints],
            this._config['start_hero_values'][options.heroClass.alias][CharacterAttributeID.MaxMagicPoints],
        ));

        let attackPowerComponent = hero.set(AttackPowerComponent.name, new AttackPowerComponent({
            range: 10,
            characterAttributeCollectorComponent: characterAttributeCollectorComponent,
            dependentCharacterAttributeComponents: _.filter(_.map(options.heroClass.mainCharacterAttributes, (characterAttribute) => {
                return hero.get<CharacterAttributeComponent>(characterAttribute['_id']);    //todo: Доступ.
            }), value => value != undefined),
            // attackPowerCharacterAttributeComponent: hero.get<CharacterAttributeComponent>(CharacterAttributeID.AttackPower),
        }));
        // console.log(attackPowerComponent);

        //Controllers
        // let equipSlotComponentControllerComponent = hero.set('equipSlotComponentControllerComponent',new EquipSlotComponentControllerComponent(
        //     equipSlotComponents,
        // ));

        hero.set(TakeComponent.name, new TakeComponent());
        // console.log(hero);
        // console.log(hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name));
        // console.log(hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.Strength));
        // console.log(hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.Agility));
        // console.log(hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.Intelligence));
        // console.log(hero.get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.AttackPower));

        return hero;
    }
}