import HeroClass from '../Entities/HeroClass.js';
import GameObject from '../../source/GameObject.js';
import HeroComponent from '../Components/HeroComponent.js';
import ExperienceComponent from '../Components/ExperienceComponent.js';
import EquipSlot from '../Entities/EquipSlot.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import MagicPointsComponent from '../Components/MagicPointsComponent.js';
import AttackController from '../Components/AttackController.js';
import GameObjectFactory from './GameObjectFactory.js';
import {CharacterAttributes, unsigned} from '../../types/main.js';
import ExperienceComponentFactory from './ExperienceComponentFactory.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import TakeComponent from '../Components/TakeComponent.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import AttackPowerDependentIncreaserDecorator
    from '../Components/CharacterAttributes/AttackPowerDependentIncreaserDecorator.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import ArmorDecorator from '../Components/CharacterAttributes/ArmorDecorator.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {assertNotNil} from '../../source/assert.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import LeftHand from '../Components/EquipSlots/LeftHand.js';
import EquipSlotFactory from './EquipSlotFactory.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import CharacterStateController from '../Components/CharacterStateController.js';
import {EntityID} from '../../types/enums/EntityID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import HeroCharacterAttributeFactory from './HeroCharacterAttributeFactory.js';
import Gatherer from '../Components/Gatherer.js';
import Hero from '../Hero.js';

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
        level: unsigned,
        // characterAttributeCollector?: CharacterAttributeCollector;
        //todo: Нужнен доступ к смене начальных атрибутов.
        options?: {
            baseCharacterAttributeValues?: {[id in CharacterAttributeID]?: number},
        },
    ): GameObject {
    // ): Hero {
        heroClass = !(heroClass instanceof HeroClass) ? this._entityManager.get<HeroClass>(EntityID.HeroClass, heroClass) : heroClass;

        // let hero = <Hero>this._gameObjectFactory.create();
        let hero = this._gameObjectFactory.create();

        hero.name = 'Hero: ' + heroClass.name;
        hero.addTags('#hero');

        let stateController = hero.set(ComponentID.StateController, new CharacterStateController());
        hero.set(TakeComponent.name, new TakeComponent());

        let heroComponent = hero.set(ComponentID.Hero, new HeroComponent(
            heroClass.name,
            heroClass,
        ));

        hero.set<ExperienceComponent>(ComponentID.Experience, this._experienceComponentFactory.create({
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
                this._entityManager.get<EquipSlot>(EntityID.EquipSlot, armorEquipSlotIDs[i]),
                heroClass,
                itemCharacterAttributeCollector,
            );
            hero.set<EquipSlotInterface>(armorEquipSlotIDs[i], equipSlot);
        }

        let leftHand: EquipSlotInterface = equipSlotFactory.createLeftHand(
            this._entityManager.get<EquipSlot>(EntityID.EquipSlot, EquipSlotID.LeftHand),
            heroClass,
            itemCharacterAttributeCollector,
        );
        let rightHand : EquipSlotInterface = equipSlotFactory.createRightHand(
            leftHand as LeftHand,
            this._entityManager.get<EquipSlot>(EntityID.EquipSlot, EquipSlotID.RightHand),
            heroClass,
            itemCharacterAttributeCollector,
        );

        equipSlotComponents.LeftHand = leftHand;    //todo: Не удобно. Если не знать, что объект нужно добавлять в два места всегда буду забывать.
        equipSlotComponents.RightHand = rightHand;
        hero.set<EquipSlotInterface>(EquipSlotID.RightHand, rightHand);
        hero.set<EquipSlotInterface>(EquipSlotID.LeftHand, leftHand);

        hero.set<Partial<Record<EquipSlotID, EquipSlotInterface>>>(ComponentID.EquipSlots, equipSlotComponents);

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
        let mainCharacterAttributes = heroClass.mainCharacterAttributes;
        //todo: Переделать при создании логики создания разных показателей для каждого класса.
        let modifier = function (value) {
            return value + _.ceil(value * 0.5); //todo: Для каждого класса нужно уникальное значение. Особено где зависимость от двух атрибутов.
        };

        for (let i = 0; i < characterAttributeIDs.length; i++) {
            let baseValueModifier;
            if (_.filter(mainCharacterAttributes, (value) => {
                return value.id === characterAttributeIDs[i];
            }).length) {
                baseValueModifier = modifier;
            }
            characterAttributes[characterAttributeIDs[i]] = hero.set<CharacterAttributeInterface>(characterAttributeIDs[i], this._characterAttributeFactory.create(
                heroClass.id as HeroClassID,
                characterAttributeIDs[i] as CharacterAttributeID,
                level,
                itemCharacterAttributeCollector,
                {
                    baseValue: options?.baseCharacterAttributeValues?.[characterAttributeIDs[i]],
                },
            ));
        }

        //todo: Цепочка? builder? .create(...).decorate(...).decorate(...).build().
        characterAttributes[CharacterAttributeID.AttackPower] = hero.set<CharacterAttributeInterface>(CharacterAttributeID.AttackPower, new AttackPowerDependentIncreaserDecorator({
            attackPower: hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
            dependentCharacterAttributes: _.filter(_.map(heroClass.mainCharacterAttributes, (characterAttribute) => {   //todo: Через индекс.
                return hero.get<CharacterAttributeInterface>(characterAttribute.id);    //todo: Доступ.
            }), value => value != undefined),
        }));

        //К компоненту с очками здоровья возможно не будет доступа вообще.
        let healthPointsComponent = new HealthPointsComponent(
            hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).MaxHealthPoints,
            stateController,
        );
        let damageController = new ArmorDecorator(
            healthPointsComponent as DamageControllerInterface,
            hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).Protection,
        );
        hero.set<HealthPointsComponent>(ComponentID.HealthPoints, healthPointsComponent); //Пока только для рендера.
        hero.set<DamageControllerInterface>(ComponentID.DamageController, damageController);

        //todo: Очки магии добавляются только для магов. Магов надо помечать или настраивать для каждого класса по отдельности.
        /*
            Кроме настроек характеристик можно сделать настройки "сборки" на каждый класс. Без логики вида if (isMage) {add(Magic());}. Надо учитывать не только компоненты, но множество одинаковых компонентов типа слоты экипировки.
            Если сделать настройки, то будет много условий. Надо както по другому. Героев с магией всё равно надо както помечать.
            А еще точнее, у классов может быть разный ресурс. Если её нету, то нету. Пока также как с ArmorMaterial у предметов.
         */

        let magicPointsComponent = hero.set(MagicPointsComponent.name, new MagicPointsComponent(
            hero.get<CharacterAttributes>(ComponentID.CharacterAttributes).MaxMagicPoints,
        ));

        let attackPowerComponent = hero.set<AttackControllerInterface>(ComponentID.AttackController, new AttackController(
            hero.get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower),
            stateController,
        ));

        //Controllers
        // let equipSlotComponentControllerComponent = hero.set('equipSlotComponentControllerComponent',new EquipSlotComponentControllerComponent(
        //     equipSlotComponents,
        // ));

        hero.set(ComponentID.Gatherer, new Gatherer(stateController));

        return hero;
    }

    createSome() {

    }
}