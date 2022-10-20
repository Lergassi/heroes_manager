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
import AttackController from '../Components/AttackController.js';
import AppError from '../../source/Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import GameObjectFactory from './GameObjectFactory.js';
import {CharacterAttributes, EquipSlots, unsigned} from '../types.js';
import ExperienceComponentFactory from './ExperienceComponentFactory.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import TakeComponent from '../Components/TakeComponent.js';
import _ from 'lodash';
import CharacterAttributeStartValueGenerator from '../Services/CharacterAttributeStartValueGenerator.js';
import CharacterAttributeCollector from '../Components/CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';
import AttackPowerDependentIncreaserDecorator
    from '../Components/CharacterAttributes/AttackPowerDependentIncreaserDecorator.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterAttributeFactory from './CharacterAttributeFactory.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import ArmorDecorator from '../Components/CharacterAttributes/ArmorDecorator.js';
import CharacterAttributeValueGenerator from '../Services/CharacterAttributeValueGenerator.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {assert, assertNotNil} from '../../source/assert.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import DefaultEquipSlot from '../Components/EquipSlots/DefaultEquipSlot.js';
import EquipSlotWithItemCategoryDecorator from '../Components/EquipSlots/EquipSlotWithItemCategoryDecorator.js';
import ItemCategory from '../Entities/ItemCategory.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import EquipSlotWithArmorMaterialDecorator from '../Components/EquipSlots/EquipSlotWithArmorMaterialDecorator.js';
import ArmorMaterial from '../Entities/ArmorMaterial.js';
import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import RightHand from '../Components/EquipSlots/RightHand.js';
import LeftHand from '../Components/EquipSlots/LeftHand.js';
import EquipSlotWithItemCollectorDecorator from '../Components/EquipSlots/EquipSlotWithItemCollectorDecorator.js';
import EquipSlotFactory from './EquipSlotFactory.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import StateController from '../Components/StateController.js';

export default class HeroFactory {
    private readonly _entityManager: EntityManager;
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _experienceComponentFactory: ExperienceComponentFactory;
    private readonly _characterAttributeFactory: CharacterAttributeFactory;

    constructor(
        options: {
            entityManager: EntityManager;
            gameObjectFactory: GameObjectFactory;
            experienceComponentFactory: ExperienceComponentFactory;
            characterAttributeFactory: CharacterAttributeFactory;
        },
    ) {
        assertNotNil(options);
        assertNotNil(options.entityManager);
        assertNotNil(options.gameObjectFactory);
        assertNotNil(options.experienceComponentFactory);
        assertNotNil(options.characterAttributeFactory);

        this._entityManager = options.entityManager;
        this._gameObjectFactory = options.gameObjectFactory;
        this._experienceComponentFactory = options.experienceComponentFactory;
        this._characterAttributeFactory = options.characterAttributeFactory;
    }

    create(
        heroClass: HeroClassID | HeroClass,
        level: unsigned,
        // characterAttributeCollector?: CharacterAttributeCollector;
    ): GameObject {
        heroClass = !(heroClass instanceof HeroClass) ? this._entityManager.get<HeroClass>(HeroClass, heroClass) : heroClass;

        //todo: Если ниже будут ошибки, в программе останется не используемый объект.
        let hero = this._gameObjectFactory.create();

        hero.name = 'Hero: ' + heroClass.name;
        hero.addTags('#hero');

        let stateController = new StateController();

        let heroComponent = hero.set(HeroComponent.name, new HeroComponent(
            heroClass.name,
            heroClass,
        ));

        hero.set<ExperienceComponent>(ExperienceComponent.name, this._experienceComponentFactory.create({
            level: level,
        }));

        let equipSlotFactory = new EquipSlotFactory(
            this._entityManager,
        );

        let armorEquipSlotIDs = [
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
            // EquipSlotID.RightHand,
            // EquipSlotID.LeftHand,
        ];

        let itemCharacterAttributeCollector = new ItemCharacterAttributeCollector();
        hero.set(ItemCharacterAttributeCollector.name, itemCharacterAttributeCollector);

        // let heroAttributeCollectorComponent = new HeroAttributeCollectorComponent();
        // hero.set(HeroAttributeCollectorComponent.name, heroAttributeCollectorComponent);

        // let characterAttributeCollector = new CharacterAttributeCollector();
        // hero.set(CharacterAttributeCollector.name, characterAttributeCollector);

        // let totalCharacterAttributeValueCollectorComponent = new TotalCharacterAttributeValueCollectorComponent({
        //     characterAttributeValueCollectorComponent: characterAttributeCollector,
        //     itemCharacterAttributeCollector: itemCharacterAttributeCollector,
        // });
        // hero.set(TotalCharacterAttributeValueCollectorComponent.name, totalCharacterAttributeValueCollectorComponent);

        let equipSlotComponents: Partial<Record<EquipSlotID, EquipSlotInterface>> = {}; //todo: Временно.
        for (let i = 0; i < armorEquipSlotIDs.length; i++) {
            let equipSlot = equipSlotFactory.createArmor(
                this._entityManager.get<EquipSlot>(EquipSlot, armorEquipSlotIDs[i]),
                heroClass,
                itemCharacterAttributeCollector,
            );
            hero.set<EquipSlotInterface>(armorEquipSlotIDs[i], equipSlot);
        }

        let leftHand: EquipSlotInterface = equipSlotFactory.createLeftHand(
            this._entityManager.get<EquipSlot>(EquipSlot, EquipSlotID.LeftHand),
            heroClass,
            itemCharacterAttributeCollector,
        );
        let rightHand : EquipSlotInterface = equipSlotFactory.createRightHand(
            leftHand as LeftHand,
            this._entityManager.get<EquipSlot>(EquipSlot, EquipSlotID.RightHand),
            heroClass,
            itemCharacterAttributeCollector,
        );

        equipSlotComponents.LeftHand = leftHand;    //todo: Не удобно. Если не знать, что объект нужно добавлять в два места всегда буду забывать.
        equipSlotComponents.RightHand = rightHand;
        hero.set<EquipSlotInterface>(EquipSlotID.RightHand, rightHand);
        hero.set<EquipSlotInterface>(EquipSlotID.LeftHand, leftHand);

        hero.set<Partial<Record<EquipSlotID, EquipSlotInterface>>>(GameObjectKey.EquipSlots, equipSlotComponents);

        //end equipSlots

        //region characterAttributes
        let characterAttributeIDs = [
            CharacterAttributeID.Strength,
            CharacterAttributeID.Agility,
            CharacterAttributeID.Intelligence,
            CharacterAttributeID.MaxHealthPoints,
            CharacterAttributeID.MaxMagicPoints,
            CharacterAttributeID.AttackPower,
            CharacterAttributeID.Protection,
            // CharacterAttributeID.Stamina,
            // CharacterAttributeID.CriticalStrike,
            // CharacterAttributeID.Luck,
        ];

        /*
            todo: Переделать в ооп когда будут все характеристики и больше логики.
                mainCharacterAttributeMultiplier разный на каждый атрибут.
                Диапазон генерации (6, 9) тоже разный. В том числе он разный для каждого класса: например у мага х2 инт, у роги х2 лов, но у стрелка или пала не значит что сил и инт х2. На каждый класс по фабрике? Классов до 100 планируется... У каждого класса своя логика. GunslingerCharacterAttributeGenerator? Т.е. не на каждый атрибут, а в целом для атридиутов. И уже внутри переопределять.
                _.random(6, 9) * (heroClass.isMainCharacterAttribute(CharacterAttributeID.Strength) ? mainCharacterAttributeMultiplier : 1) - должно быть в одном одном месте. При изменении приходиться менять все строки.
                Как сделать отдельные классы для не главных атрибутов? Там немного другая логика. Они не могут быть главной. Это нужно решать выше. В CharacterAttributeComponent нужно передавать уже сформированное значение. Компоненту не важно - главаный он или нет.
                    Например при увеличении значение генериуется вне его. Т.е. при increaseBaseValue(value) если внутри у силы будет отдельная логика поведение будет... Хотя нет. наоборот поведение должно быть задано. Но тогда increaseBaseValue(10) приведет не к увеличению на 10, а на 100 например.
                    А если я хочу просто увеличить значение без учета логики класса? Просто добавить значения. Я не смогу отменить логику внутри класса. А за разницу роста главных характеристик пусть отвечает другой класс. Получается isMain не нужен.
                (6, 9) и прочие подобные значения передавать из вне или внутри задавать?
         */
        //todo: Временно.
        let characterAttributes: CharacterAttributes = {};
        hero.set<CharacterAttributes>(GameObjectKey.CharacterAttributes, characterAttributes);

        //todo: Переделать хранение главных атрибутов у классов.
        let mainCharacterAttributes = heroClass.mainCharacterAttributes;
        //todo: Переделать при создании логики создания разных показателей для каждого класса.
        let modifiers = {
            main: function (value) {
                return value + _.ceil(value * 0.5); //todo: Для каждого класса нужно уникальное значение. Особено где зависимость от двух атрибутов.
            },
        };

        for (let i = 0; i < characterAttributeIDs.length; i++) {
            let baseValueModifier;
            if (_.filter(mainCharacterAttributes, (value) => {
                return value['_id'] === characterAttributeIDs[i];
            }).length) {
                baseValueModifier = modifiers.main;
            }
            characterAttributes[characterAttributeIDs[i]] = hero.set<CharacterAttributeInterface>(characterAttributeIDs[i], this._characterAttributeFactory.create(
                characterAttributeIDs[i] as CharacterAttributeID,
                level,
                itemCharacterAttributeCollector,
                {
                    baseValueModifier: baseValueModifier,
                },
            ));
        }

        //todo: Цепочка? builder? .create(...).decorate(...).decorate(...).build().
        characterAttributes[CharacterAttributeID.AttackPower] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.AttackPower, new AttackPowerDependentIncreaserDecorator({
            attackPower: hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
            dependentCharacterAttributes: _.filter(_.map(heroClass.mainCharacterAttributes, (characterAttribute) => {   //todo: Через индекс.
                return hero.get<CharacterAttributeInterface>(characterAttribute['_id']);    //todo: Доступ.
            }), value => value != undefined),
            // dependentCharacterAttributes: [],
        }));

        //К компоненту с очками здоровья возможно не будет доступа вообще.
        let healthPointsComponent = new HealthPointsComponent(
            hero.get<CharacterAttributes>(GameObjectKey.CharacterAttributes).MaxHealthPoints,
            stateController,
        );
        let damageController = new ArmorDecorator(
            healthPointsComponent as DamageControllerInterface,
            hero.get<CharacterAttributes>(GameObjectKey.CharacterAttributes).Protection,
        );
        hero.set<HealthPointsComponent>(HealthPointsComponent.name, healthPointsComponent); //Пока только для рендера.
        hero.set<DamageControllerInterface>(GameObjectKey.DamageController, damageController);

        //todo: Очки магии добавляются только для магов. Магов надо помечать или настраивать для каждого класса по отдельности.
        /*
            Кроме настроек характеристик можно сделать настройки "сборки" на каждый класс. Без логики вида if (isMage) {add(Magic());}. Надо учитывать не только компоненты, но множество одинаковых компонентов типа слоты экипировки.
            Если сделать настройки, то будет много условий. Надо както по другому. Героев с магией всё равно надо както помечать.
            А еще точнее, у классов может быть разный ресурс. Если её нету, то нету. Пока также как с ArmorMaterial у предметов.
         */

        let magicPointsComponent = hero.set(MagicPointsComponent.name, new MagicPointsComponent(
            hero.get<CharacterAttributes>(GameObjectKey.CharacterAttributes).MaxMagicPoints,
        ));

        let attackPowerComponent = hero.set<AttackControllerInterface>(GameObjectKey.AttackController, new AttackController(
            hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
            stateController,
            // _.filter(_.map(heroClass.mainCharacterAttributes, (characterAttribute) => {
            //     return hero.get<CharacterAttributeInterface>(characterAttribute['_id']);    //todo: Доступ.
            // }), value => value != undefined),
        ));

        //Controllers
        // let equipSlotComponentControllerComponent = hero.set('equipSlotComponentControllerComponent',new EquipSlotComponentControllerComponent(
        //     equipSlotComponents,
        // ));

        hero.set(TakeComponent.name, new TakeComponent());

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