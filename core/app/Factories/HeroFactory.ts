import HeroClass from '../Entities/HeroClass.js';
import GameObject from '../../source/GameObject.js';
import HeroComponent from '../Components/HeroComponent.js';
import ExperienceComponent from '../Components/ExperienceComponent.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import EntityManager from '../../source/EntityManager.js';
import EquipSlot from '../Entities/EquipSlot.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import MagicPointsComponent from '../Components/MagicPointsComponent.js';
import AttackPowerComponent from '../Components/AttackPowerComponent.js';
import AppError from '../../source/Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import GameObjectFactory from './GameObjectFactory.js';
import {CharacterAttributes, EquipSlots, unsigned} from '../types.js';
import ExperienceComponentFactory from './ExperienceComponentFactory.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import TakeComponent from '../Components/TakeComponent.js';
import _ from 'lodash';
import CharacterAttributeValueGenerator from '../Services/CharacterAttributeValueGenerator.js';
import CharacterAttributeCollector from '../Components/CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';
import AttackPowerDependentIncreaserDecorator
    from '../Components/CharacterAttributes/AttackPowerDependentIncreaserDecorator.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterAttributeFactory from './CharacterAttributeFactory.js';

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
        characterAttributeCollector?: CharacterAttributeCollector;
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

        let heroComponent = hero.set(HeroComponent.name, new HeroComponent(
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

        let itemCharacterAttributeCollector = new ItemCharacterAttributeCollector();
        hero.set(ItemCharacterAttributeCollector.name, itemCharacterAttributeCollector);

        // let heroAttributeCollectorComponent = new HeroAttributeCollectorComponent();
        // hero.set(HeroAttributeCollectorComponent.name, heroAttributeCollectorComponent);

        let characterAttributeCollector = new CharacterAttributeCollector();
        hero.set(CharacterAttributeCollector.name, characterAttributeCollector);

        // let totalCharacterAttributeValueCollectorComponent = new TotalCharacterAttributeValueCollectorComponent({
        //     characterAttributeValueCollectorComponent: characterAttributeCollector,
        //     itemCharacterAttributeCollector: itemCharacterAttributeCollector,
        // });
        // hero.set(TotalCharacterAttributeValueCollectorComponent.name, totalCharacterAttributeValueCollectorComponent);

        let equipSlotComponents: EquipSlots = {};
        equipSlotIDs.forEach((equipSlotID) => {
            let equipSlotComponent = new EquipSlotComponent({
                equipSlot: this._entityManager.getRepository<EquipSlot>(EquipSlot.name).getOneByAlias(equipSlotID),
                heroComponent: heroComponent,
                itemAttributeCollectorComponent: itemCharacterAttributeCollector,
            });
            hero.addComponent(equipSlotComponent);
            hero.set<EquipSlotComponent>(equipSlotID, equipSlotComponent);
            equipSlotComponents[equipSlotID] = equipSlotComponent;
        });
        //todo: Временно.
        hero.set<EquipSlots>(GameObjectKey.EquipSlots, equipSlotComponents);

        //region characterAttributes
        let characterAttributeIDs = [
            CharacterAttributeID.Strength,
            CharacterAttributeID.Agility,
            CharacterAttributeID.Intelligence,
            CharacterAttributeID.AttackPower,
            // CharacterAttributeID.Stamina,
            // CharacterAttributeID.CriticalStrike,
            // CharacterAttributeID.Luck,
        ];

        let characterAttributeValueFactory = new CharacterAttributeValueGenerator();
        let mainCharacterAttributeMultiplier = 2;
        let characterAttributeFactory = new CharacterAttributeFactory(
            characterAttributeValueFactory,
        );
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
        let characterAttributes: CharacterAttributes = {};
        //todo: Временно.
        hero.set<CharacterAttributes>(GameObjectKey.CharacterAttributes, characterAttributes);

        let mainCharacterAttributes = options.heroClass.mainCharacterAttributes;
        //todo: Остается вопрос как генерировать разные показатели для каждого класса по отдельности. У мага своя логика, у воина своя и тд.
        let modifiers = {
            main: new (function () {
                this.modify = function (value) {
                    return value * 2;
                }
            }),
        };

        for (let i = 0; i < characterAttributeIDs.length; i++) {
            let modifier;
            if (_.filter(mainCharacterAttributes, (value) => {
                return value['_id'] === characterAttributeIDs[i];
            }).length) {
                modifier = modifiers.main;
            }
            characterAttributes[characterAttributeIDs[i]] = hero.set<CharacterAttributeInterface>(characterAttributeIDs[i], characterAttributeFactory.create(characterAttributeIDs[i] as CharacterAttributeID, options.level, itemCharacterAttributeCollector, modifier));
        }

        // characterAttributes[CharacterAttributeID.Strength] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.Strength, new CharacterAttribute({
        //     characterAttributeID: CharacterAttributeID.Strength,
        //     itemCharacterAttributeCollector: itemCharacterAttributeCollector,
        // }));
        // hero.get<CharacterAttributeInterface>(CharacterAttributeID.Strength).increaseBaseValue(characterAttributeValueFactory.generate({
        //     level: options.level,
        //     characterAttributeID: CharacterAttributeID.Strength,
        // }) * (options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Strength) ? mainCharacterAttributeMultiplier : 1));
        //todo: Вобщем пока без увеличенных стартовых значений.
        // characterAttributes[CharacterAttributeID.Strength] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.Strength, characterAttributeFactory.create(CharacterAttributeID.Strength, options.level, itemCharacterAttributeCollector));
        //
        // characterAttributes[CharacterAttributeID.Agility] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.Agility, new CharacterAttribute({
        //     characterAttributeID: CharacterAttributeID.Agility,
        //     itemCharacterAttributeCollector: itemCharacterAttributeCollector,
        // }));
        // hero.get<CharacterAttributeInterface>(CharacterAttributeID.Agility).increaseBaseValue(characterAttributeValueFactory.generate({
        //     level: options.level,
        //     characterAttributeID: CharacterAttributeID.Agility,
        // }) * (options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Agility) ? mainCharacterAttributeMultiplier : 1));
        //
        // characterAttributes[CharacterAttributeID.Intelligence] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.Intelligence, new CharacterAttribute({
        //     characterAttributeID: CharacterAttributeID.Intelligence,
        //     itemCharacterAttributeCollector: itemCharacterAttributeCollector,
        // }));
        // hero.get<CharacterAttributeInterface>(CharacterAttributeID.Intelligence).increaseBaseValue(characterAttributeValueFactory.generate({
        //     level: options.level,
        //     characterAttributeID: CharacterAttributeID.Intelligence,
        // }) * (options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Intelligence) ? mainCharacterAttributeMultiplier : 1));
        //
        // characterAttributes[CharacterAttributeID.AttackPower] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.AttackPower, new CharacterAttribute({
        //     characterAttributeID: CharacterAttributeID.AttackPower,
        //     itemCharacterAttributeCollector: itemCharacterAttributeCollector,
        // }));
        // hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower).increaseBaseValue(characterAttributeValueFactory.generate({
        //     level: options.level,
        //     characterAttributeID: CharacterAttributeID.AttackPower,
        // }));
        //todo: Цепочка?builder? .create(...).decorate(...).decorate(...).build().
        characterAttributes[CharacterAttributeID.AttackPower] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.AttackPower, new AttackPowerDependentIncreaserDecorator({
            attackPower: hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
            dependentCharacterAttributes: _.filter(_.map(options.heroClass.mainCharacterAttributes, (characterAttribute) => {   //todo: Через индекс.
                return hero.get<CharacterAttributeInterface>(characterAttribute['_id']);    //todo: Доступ.
            }), value => value != undefined),
        }));

        let healthPointsComponent = hero.addComponent(new HealthPointsComponent(
            this._config['start_hero_values'][options.heroClass.alias][CharacterAttributeID.MaxHealthPoints],
        ));
        hero.set<HealthPointsComponent>(HealthPointsComponent.name, healthPointsComponent);

        //todo: Очки магии добавляются только для магов. Магов надо помечать или настраивать для каждого класса по отдельности.
        /*
            Кроме настроек характеристик можно сделать настройки "сборки" на каждый класс. Без логики вида if (isMage) {add(Magic());}. Надо учитывать не только компоненты, но множество одинаковых компонентов типа слоты экипировки.
            Если сделать настройки, то будет много условий. Надо както по другому. Героев с магией всё равно надо както помечать.
            А еще точнее, у классов может быть разный ресурс. Если её нету, то нету. Пока также как с ArmorMaterial у предметов.
         */

        let magicPointsComponent = hero.set(MagicPointsComponent.name, new MagicPointsComponent(
            this._config['start_hero_values'][options.heroClass.alias][CharacterAttributeID.MaxMagicPoints],
            this._config['start_hero_values'][options.heroClass.alias][CharacterAttributeID.MaxMagicPoints],
        ));

        let attackPowerComponent = hero.set(AttackPowerComponent.name, new AttackPowerComponent({
            attackPower: hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
            dependentCharacterAttributeComponents: _.filter(_.map(options.heroClass.mainCharacterAttributes, (characterAttribute) => {
                return hero.get<CharacterAttributeInterface>(characterAttribute['_id']);    //todo: Доступ.
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

    // private _createCharacterAttributes(options: {
    //     level: unsigned,
    //     hero: GameObject,
    //     itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
    //     characterAttributeCollector: CharacterAttributeCollector,
    // }) {
    //
    // }
}