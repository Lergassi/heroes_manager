import _ from 'lodash';
import {database} from '../../data/ts/database.js';
import {assertNotNil} from '../../source/assert.js';
import GameObject from '../../source/GameObject.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {CharacterAttributes} from '../../types/main.js';
import AttackController from '../Components/AttackController.js';
import AverageItemLevel from '../Components/AverageItemLevel.js';
import CharacterAttributeManager from '../Components/CharacterAttributeManager.js';
import AttackPowerDependentIncreaseDecorator
    from '../Components/CharacterAttributes/AttackPowerDependentIncreaseDecorator.js';
import Endurance from '../Components/Endurance.js';
import EquipController from '../Components/EquipController.js';
import LeftHand from '../Components/EquipSlots/LeftHand.js';
import Experience from '../Components/Experience.js';
import Gatherer from '../Components/Gatherer.js';
import HealthPointsController from '../Components/HealthPointsController.js';
import HealthPoints from '../Components/HealthPoints.js';
import HeroActivityStateController from '../Components/HeroActivityStateController.js';
import HeroComponent from '../Components/HeroComponent.js';
import ActionStateController from '../Components/ActionStateController.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import EquipSlot from '../Entities/EquipSlot.js';
import HeroClass from '../Entities/HeroClass.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import EquipSlotFactory from './EquipSlotFactory.js';
import ExperienceComponentFactory from './ExperienceComponentFactory.js';
import GameObjectFactory from './GameObjectFactory.js';
import HeroCharacterAttributeFactory from './HeroCharacterAttributeFactory.js';
import EnduranceController from "../Components/EnduranceController";

export default class HeroFactory {
    private readonly _entityManager: EntityManagerInterface;
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _experienceComponentFactory: ExperienceComponentFactory;
    private readonly _characterAttributeFactory: HeroCharacterAttributeFactory;

    constructor(
        entityManager: EntityManagerInterface,
        gameObjectFactory: GameObjectFactory,
        experienceComponentFactory: ExperienceComponentFactory,
        characterAttributeFactory: HeroCharacterAttributeFactory,
    ) {
        assertNotNil(entityManager);
        assertNotNil(gameObjectFactory);
        assertNotNil(experienceComponentFactory);
        assertNotNil(characterAttributeFactory);

        this._entityManager = entityManager;
        this._gameObjectFactory = gameObjectFactory;
        this._experienceComponentFactory = experienceComponentFactory;
        this._characterAttributeFactory = characterAttributeFactory;
    }

    create(
        heroClass: HeroClassID | HeroClass,
        level: number,
        //todo: Нужнен доступ к смене начальных атрибутов.
        options?: {
            baseCharacterAttributeValues?: {[id in CharacterAttributeID]?: number}, //todo: Через строитель.
        },
    ): GameObject {
        heroClass = !(heroClass instanceof HeroClass) ? this._entityManager.get<HeroClass>(EntityID.HeroClass, heroClass) : heroClass;
        assertNotNil(heroClass, 'HeroClass не найден.');

        let hero = this._gameObjectFactory.create();

        hero.name = 'Hero: ' + heroClass.id;
        hero.addTags('#hero');

        let actionStateController = hero.set(ComponentID.LifeStateController, new ActionStateController());
        hero.set(ComponentID.HeroActivityStateController, new HeroActivityStateController());

        let endurance = hero.set(ComponentID.Endurance, new Endurance(actionStateController));

        let heroComponent = hero.set(ComponentID.Hero, new HeroComponent(
            heroClass.name,
            heroClass,
        ));

        hero.set<HeroClassID>(ComponentID.HeroClassID, heroClass.id as HeroClassID)
        hero.set<Experience>(ComponentID.Experience, this._experienceComponentFactory.create({
            level: level,
            hero: hero,
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
        ];

        let jewelrySlotIDs = [
            EquipSlotID.Neck,
            EquipSlotID.Finger01,
            EquipSlotID.Finger02,
            // EquipSlotID.Trinket,
        ];

        let characterAttributeManager = new CharacterAttributeManager(hero);
        hero.set(ComponentID.CharacterAttributeManager, characterAttributeManager);

        let averageItemLevel = new AverageItemLevel();
        hero.set(ComponentID.AverageItemLevel, averageItemLevel);

        for (let i = 0; i < armorEquipSlotIDs.length; i++) {
            let equipSlot = equipSlotFactory.createArmor(
                this._entityManager.get<EquipSlot>(EntityID.EquipSlot, armorEquipSlotIDs[i]),
                heroClass,
                characterAttributeManager,
                averageItemLevel,
            );
            hero.set<EquipSlotInterface>(armorEquipSlotIDs[i], equipSlot);
        }

        for (let i = 0; i < jewelrySlotIDs.length; i++) {
            let equipSlot = equipSlotFactory.create(
                this._entityManager.get<EquipSlot>(EntityID.EquipSlot, jewelrySlotIDs[i]),
                heroClass,
                characterAttributeManager,
                averageItemLevel,
            );
            hero.set<EquipSlotInterface>(jewelrySlotIDs[i], equipSlot);
        }

        let leftHand: EquipSlotInterface = equipSlotFactory.createLeftHand(
            this._entityManager.get<EquipSlot>(EntityID.EquipSlot, EquipSlotID.LeftHand),
            heroClass,
            characterAttributeManager,
            averageItemLevel,
        );
        let rightHand : EquipSlotInterface = equipSlotFactory.createRightHand(
            leftHand as LeftHand,
            this._entityManager.get<EquipSlot>(EntityID.EquipSlot, EquipSlotID.RightHand),
            heroClass,
            characterAttributeManager,
            averageItemLevel,
        );

        //todo: Не удобно. Если не знать, что объект нужно добавлять в два места всегда буду забывать.
        hero.set<EquipSlotInterface>(EquipSlotID.RightHand, rightHand);
        hero.set<EquipSlotInterface>(EquipSlotID.LeftHand, leftHand);

        hero.set(ComponentID.EquipController, new EquipController(hero));

        //end equipSlots

        //region characterAttributes
        let characterAttributeIDs = [
            CharacterAttributeID.Strength,
            CharacterAttributeID.Agility,
            CharacterAttributeID.Intelligence,
            CharacterAttributeID.MaxHealthPoints,
            CharacterAttributeID.AttackPower,
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
        hero.set<CharacterAttributes>(ComponentID.CharacterAttributes, characterAttributes);

        //todo: Переделать хранение главных атрибутов у классов.
        let mainCharacterAttributeIDs = database.hero_classes.data.mainCharacterAttributes(heroClass.id as HeroClassID, (ID) => {
            return ID;
        });
        let modifier = function (value) {
            return value + _.ceil(value * 0.5); //todo: Для каждого класса нужно уникальное значение. Особено где зависимость от двух атрибутов.
        };

        for (let i = 0; i < characterAttributeIDs.length; i++) {
            let baseValueModifier;
            if (_.filter(mainCharacterAttributeIDs, (value) => {
                // return value.id === characterAttributeIDs[i];
                return value === characterAttributeIDs[i];
            }).length) {
                baseValueModifier = modifier;
            }
            characterAttributes[characterAttributeIDs[i]] = hero.set<CharacterAttributeInterface>(characterAttributeIDs[i], this._characterAttributeFactory.create(
                heroClass.id as HeroClassID,
                characterAttributeIDs[i] as CharacterAttributeID,
                level,
                {
                    baseValue: options?.baseCharacterAttributeValues?.[characterAttributeIDs[i]],
                },
            ));
        }

        //todo: Цепочка? builder? .create(...).decorate(...).decorate(...).build().
        characterAttributes[CharacterAttributeID.AttackPower] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.AttackPower, new AttackPowerDependentIncreaseDecorator({
            attackPower: hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
            dependentCharacterAttributes: _.filter(_.map(mainCharacterAttributeIDs, (characterAttributeID) => {   //todo: Через индекс.
                return hero.get<CharacterAttributeInterface>(characterAttributeID);    //todo: Доступ.
            }), value => value != undefined),
        }));

        //К компоненту с очками здоровья возможно не будет доступа вообще.
        let healthPoints = new HealthPoints(
            hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).MaxHealthPoints,
            actionStateController,
        );
        hero.set(ComponentID.HealthPointsController, new HealthPointsController(healthPoints));
        //todo: Алгоритм будет другой - не с зельями. Возможно с едой и хватать будет на часы или даже дни. С прокачкой.
        hero.set(ComponentID.EnduranceController, new EnduranceController(endurance));
        // let damageController = new ArmorDecorator(
        //     healthPoints as DamageControllerInterface,
        //     hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).Protection,
        // );
        hero.set<HealthPoints>(ComponentID.HealthPoints, healthPoints); //Пока только для рендера.
        hero.set<DamageControllerInterface>(ComponentID.DamageController, healthPoints);

        hero.set<AttackControllerInterface>(ComponentID.AttackController, new AttackController(
            hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
            actionStateController,
            hero.get<EquipSlotInterface>(EquipSlotID.RightHand),
            endurance,
        ));

        //todo: Очки магии добавляются только для магов. Магов надо помечать или настраивать для каждого класса по отдельности.
        /*
            Кроме настроек характеристик можно сделать настройки "сборки" на каждый класс. Без логики вида if (isMage) {add(Magic());}. Надо учитывать не только компоненты, но множество одинаковых компонентов типа слоты экипировки.
            Если сделать настройки, то будет много условий. Надо както по другому. Героев с магией всё равно надо както помечать.
            А еще точнее, у классов может быть разный ресурс. Если её нету, то нету. Пока также как с ArmorMaterial у предметов.
         */

        // hero.set(MagicPointsComponent.name, new MagicPointsComponent(
        //     hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).MaxMagicPoints,
        // ));

        hero.set(ComponentID.Gatherer, new Gatherer(actionStateController));

        return hero;
    }

    createRandom(level: number): GameObject {
        let heroClassIDs = [
            HeroClassID.Warrior,
            HeroClassID.Paladin,
            HeroClassID.Tank1,
            HeroClassID.Tank2,
            HeroClassID.Tank3,
            HeroClassID.Gladiator,
            HeroClassID.Barbarian,
            HeroClassID.PlateDamageDealer1,
            HeroClassID.PlateDamageDealer2,
            HeroClassID.PlateDamageDealer3,
            HeroClassID.LeatherDamageDealer1,
            HeroClassID.Rogue,
            HeroClassID.Archer,
            HeroClassID.LeatherDamageDealer2,
            HeroClassID.Necromancer,
            HeroClassID.Mage1,
            HeroClassID.Mage2,
            HeroClassID.Warlock,
            HeroClassID.FireMage,
            HeroClassID.Support4,
            HeroClassID.Support5,
            HeroClassID.Support1,
            HeroClassID.Support2,
            HeroClassID.Support3,
        ];

        return this.create(heroClassIDs[_.random(0, heroClassIDs.length - 1)], level);
    }

    // createByStrategy(level: number, heroClassID: HeroClassID) {
    //     // heroClass = !(heroClass instanceof HeroClass) ? this._entityManager.get<HeroClass>(EntityID.HeroClass, heroClass) : heroClass;
    //     // assertNotNil(heroClass, 'HeroClass не найден.');
    //
    //     let hero = this._gameObjectFactory.create();
    //
    //     let stateController = hero.set(ComponentID.LifeStateController, new LifeStateController());
    //     hero.set(ComponentID.ActivityStateController, new HeroActivityStateController());
    //
    //     hero.set<HeroClassID>(ComponentID.HeroClassID, heroClassID);
    //
    //     hero.set<Experience>(ComponentID.Experience, this._experienceComponentFactory.create({
    //         level: level,
    //     }));
    //
    //     let equipSlotFactory = new EquipSlotFactory(
    //         this._entityManager,
    //     );
    //
    //     //region Разная стратегия для классов. Без получения данных из бд.
    //     let armorEquipSlotIDs = [
    //         EquipSlotID.Head,
    //         EquipSlotID.Shoulders,
    //         EquipSlotID.Chest,
    //         EquipSlotID.Wrist,
    //         EquipSlotID.Hands,
    //         EquipSlotID.Waist,
    //         EquipSlotID.Legs,
    //         EquipSlotID.Foots,
    //     ];
    //
    //     let jewelSlotIDs = [
    //         EquipSlotID.Neck,
    //         EquipSlotID.Finger01,
    //         EquipSlotID.Finger02,
    //         EquipSlotID.Trinket,
    //     ];
    //
    //     let itemCharacterAttributeCollector = new ItemCharacterAttributeCollector();
    //     hero.set(ItemCharacterAttributeCollector.name, itemCharacterAttributeCollector);
    //
    //     let averageItemLevel = new AverageItemLevel();
    //     hero.set(ComponentID.AverageItemLevel, averageItemLevel);
    //
    //     for (let i = 0; i < armorEquipSlotIDs.length; i++) {
    //         let equipSlot = equipSlotFactory.createArmor(
    //             this._entityManager.get<EquipSlot>(EntityID.EquipSlot, armorEquipSlotIDs[i]),
    //             heroClass,
    //             itemCharacterAttributeCollector,
    //             averageItemLevel,
    //         );
    //         hero.set<EquipSlotInterface>(armorEquipSlotIDs[i], equipSlot);
    //     }
    //
    //     for (let i = 0; i < jewelSlotIDs.length; i++) {
    //         let equipSlot = equipSlotFactory.create(
    //             this._entityManager.get<EquipSlot>(EntityID.EquipSlot, jewelSlotIDs[i]),
    //             heroClass,
    //             itemCharacterAttributeCollector,
    //             averageItemLevel,
    //         );
    //         hero.set<EquipSlotInterface>(jewelSlotIDs[i], equipSlot);
    //     }
    //
    //     let leftHand: EquipSlotInterface = equipSlotFactory.createLeftHand(
    //         this._entityManager.get<EquipSlot>(EntityID.EquipSlot, EquipSlotID.LeftHand),
    //         heroClass,
    //         itemCharacterAttributeCollector,
    //         averageItemLevel,
    //     );
    //     let rightHand : EquipSlotInterface = equipSlotFactory.createRightHand(
    //         leftHand as LeftHand,
    //         this._entityManager.get<EquipSlot>(EntityID.EquipSlot, EquipSlotID.RightHand),
    //         heroClass,
    //         itemCharacterAttributeCollector,
    //         averageItemLevel,
    //     );
    //
    //     // equipSlotComponents.LeftHand = leftHand;    //todo: Не удобно. Если не знать, что объект нужно добавлять в два места всегда буду забывать.
    //     // equipSlotComponents.RightHand = rightHand;
    //     hero.set<EquipSlotInterface>(EquipSlotID.RightHand, rightHand);
    //     hero.set<EquipSlotInterface>(EquipSlotID.LeftHand, leftHand);
    //
    //     // hero.set<Partial<Record<EquipSlotID, EquipSlotInterface>>>(ComponentID.EquipSlots, equipSlotComponents);
    //     hero.set(ComponentID.EquipController, new EquipController(hero));
    //
    //     //endregion equipSlots
    //
    //     //region characterAttributes Также разная логика. сил/агл/инт только 1 атрибут у героя. И получается можно настраивать для каждого класс по отдельности без кучи if, бд.
    //     let characterAttributeIDs = [
    //         CharacterAttributeID.Strength,
    //         CharacterAttributeID.Agility,
    //         CharacterAttributeID.Intelligence,
    //         CharacterAttributeID.MaxHealthPoints,
    //         CharacterAttributeID.MaxMagicPoints,
    //         CharacterAttributeID.AttackPower,
    //         CharacterAttributeID.Protection,
    //     ];
    //
    //     // let characterAttributes: CharacterAttributes = {};
    //     // hero.set<CharacterAttributes>(ComponentID.CharacterAttributes, characterAttributes);
    //     //todo: CharacterAttributeController
    //
    //     let mainCharacterAttributes = heroClass.mainCharacterAttributes;
    //     //todo: Переделать при создании логики создания разных показателей для каждого класса.
    //     let modifier = function (value) {
    //         return value + _.ceil(value * 0.5); //todo: Для каждого класса нужно уникальное значение. Особено где зависимость от двух атрибутов.
    //     };
    //
    //     for (let i = 0; i < characterAttributeIDs.length; i++) {
    //         let baseValueModifier;
    //         if (_.filter(mainCharacterAttributes, (value) => {
    //             return value.id === characterAttributeIDs[i];
    //         }).length) {
    //             baseValueModifier = modifier;
    //         }
    //         characterAttributes[characterAttributeIDs[i]] = hero.set<CharacterAttributeInterface>(characterAttributeIDs[i], this._characterAttributeFactory.create(
    //             heroClass.id as HeroClassID,
    //             characterAttributeIDs[i] as CharacterAttributeID,
    //             level,
    //             itemCharacterAttributeCollector,
    //             {
    //                 baseValue: options?.baseCharacterAttributeValues?.[characterAttributeIDs[i]],
    //             },
    //         ));
    //     }
    //
    //     // characterAttributes[CharacterAttributeID.ItemLevel] = new CharacterAttribute(CharacterAttributeID.ItemLevel, itemCharacterAttributeCollector, 0);
    //
    //     //todo: Цепочка? builder? .create(...).decorate(...).decorate(...).build().
    //     characterAttributes[CharacterAttributeID.AttackPower] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.AttackPower, new AttackPowerDependentIncreaserDecorator({
    //         attackPower: hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
    //         dependentCharacterAttributes: _.filter(_.map(heroClass.mainCharacterAttributes, (characterAttribute) => {   //todo: Через индекс.
    //             return hero.get<CharacterAttributeInterface>(characterAttribute.id);    //todo: Доступ.
    //         }), value => value != undefined),
    //     }));
    //
    //     //endregion characterAttributes
    //
    //     //region hero components
    //
    //     //К компоненту с очками здоровья возможно не будет доступа вообще.
    //     let healthPointsComponent = new HealthPoints(
    //         hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).MaxHealthPoints,
    //         stateController,
    //     );
    //     let damageController = new ArmorDecorator(
    //         healthPointsComponent as DamageControllerInterface,
    //         hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).Protection,
    //     );
    //     hero.set<HealthPoints>(ComponentID.HealthPoints, healthPointsComponent); //Пока только для рендера.
    //     hero.set<DamageControllerInterface>(ComponentID.DamageController, damageController);
    //
    //     hero.set<AttackControllerInterface>(ComponentID.AttackController, new AttackController(
    //         hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
    //         stateController,
    //     ));
    //
    //     //todo: Очки магии добавляются только для магов. Магов надо помечать или настраивать для каждого класса по отдельности.
    //     /*
    //         Кроме настроек характеристик можно сделать настройки "сборки" на каждый класс. Без логики вида if (isMage) {add(Magic());}. Надо учитывать не только компоненты, но множество одинаковых компонентов типа слоты экипировки.
    //         Если сделать настройки, то будет много условий. Надо както по другому. Героев с магией всё равно надо както помечать.
    //         А еще точнее, у классов может быть разный ресурс. Если её нету, то нету. Пока также как с ArmorMaterial у предметов.
    //      */
    //
    //     hero.set(MagicPointsComponent.name, new MagicPointsComponent(
    //         hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).MaxMagicPoints,
    //     ));
    //
    //     hero.set(ComponentID.Gatherer, new Gatherer(stateController));
    //
    //     return hero;
    // }
}