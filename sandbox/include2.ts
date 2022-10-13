import {ItemProperties} from '../core/app/Entities/Item.js';
import GameObjectFactory from '../core/app/Factories/GameObjectFactory.js';
import IDGeneratorInterface from '../core/source/IDGeneratorInterface.js';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import HeroGroupComponent from '../core/app/Components/HeroGroupComponent.js';
import ItemStackFactory from '../core/app/Factories/ItemStackFactory.js';
import ItemStorageManager from '../core/app/Services/ItemStorageManager.js';
import ItemStorageFactoryInterface from '../core/app/Factories/ItemStorageFactoryInterface.js';
import MainItemStorageListComponent from '../core/app/Components/MainItemStorageListComponent.js';
import ContainerInterface from '../core/source/ContainerInterface.js';
import Container from '../core/source/Container.js';
import DefaultContainerConfigure from '../core/app/DefaultContainerConfigure.js';
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import PlayerContainerConfigure from '../core/app/PlayerContainerConfigure.js';
import {HeroClassID} from '../core/app/types.js';
import {ContainerKey} from '../core/types/containerKey.js';

function createEndPlayerContainer(): ContainerInterface {
    let container = new Container();
    (new DefaultContainerConfigure()).configure(container);
    // (new ServerContainerConfigure()).configure(container);
    (new CoreContainerConfigure()).configure(container);
    (new PlayerContainerConfigure()).configure(container);

    return container;
}

interface TestIncreaseInterface {
    strength: number;
    agility: number;
    intelligence: number;
}

type TestIncreaseOptions = {

}

type TestIncreaseProperty = keyof TestIncreaseInterface;

enum Options {
    ONE = 'one',
    TWO = 'two',
    THREE = 'three',
}

type TestIncreaseType = {
// class TestIncreaseList {
    // [key: TestIncreaseProperty]: ArmorMaterial;
    // [key in TestIncreaseInterface]: ArmorMaterial;
    // [key in Options]: ArmorMaterial;
    // [key in keyof TestIncreaseInterface]: number;
    [key in TestIncreaseProperty]: number;
}

class TestIncreaseClass {
    // [key: TestIncreaseProperty]: number;
    // [key: Options]: number;
    // [key: string]: number;
}

// class TestIncreaseList extends TestIncreaseType {
//
// }

export class ItemPropertyList {
    // [key: keyof ItemProperties]:
    private readonly _properties: Readonly<ItemProperties>;

    get properties(): Readonly<ItemProperties> {
        return this._properties;
    }

    constructor(properties: Readonly<ItemProperties> = {}) {
        // for (const propertiesKey in ItemProperties) {
        //
        // }
        this._properties = properties;
    }

    // set<T>(property: ItemProperty, value: T) {
    //
    // }

    // get(property: ItemProperty) {
    // // get<T>(property: ItemProperty): T {
    //     return this._properties[property];
    //     // return <T>this._properties[property];
    // }

    // getget(): {
    //
    // }
}

export function testItemProperty() {
    // let itemPropertyList = new ItemPropertyList({
    //     // stackSize: 42,
    //     // isEquipable: true,
    // });
    // console.log(itemPropertyList);
    // console.log(itemPropertyList.get('stackSize'));
    // let property = <ArmorMaterial>itemPropertyList.get('armorMaterial');
    // let property = itemPropertyList.get('armorMaterial') as ArmorMaterial;
    // let property = itemPropertyList.properties.stackSize;
    // let property = itemPropertyList.properties.armorMaterial;
    // console.log(property);
    // console.log(property.alias);
    // console.log(itemPropertyList.get('stackSize1'));
    // let a: TestIncreaseProperty = CharacterAttributeID.Agility;
    // let c = new TestIncreaseList();
    // console.log(c.strength.alias);

    // let a: Partial<TestIncreaseType> = {
    //     agility: 4242,
    // };
    // // a.agility = 42;
    // console.log(a);
}

export function testHeroGroup() {
    let container = createEndPlayerContainer();
    let gameObjectFactory = container.get<GameObjectFactory>('player.gameObjectFactory');
    let idGenerator = container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator');
    let heroFactory = container.get<HeroFactory>('player.heroFactory');

    let heroGroup = gameObjectFactory.create();

    let heroes = [
        // heroFactory.create('warrior'),
        // heroFactory.create('rogue'),
        // heroFactory.create('gunslinger'),
        // heroFactory.create('mage'),
        // heroFactory.create('mage'),
        // heroFactory.create('warrior'),
    ];
    // console.log(heroes);

    let heroGroupComponent = new HeroGroupComponent({
        size: 5,
    });
    // console.log(heroGroupComponent);

    // heroGroupComponent.setHero(2, heroes[0]);
    // heroGroupComponent.setHero(4, heroes[0]);
    // heroGroupComponent.setHero(100, heroes[0]);
    heroGroupComponent.addHero(heroes[0]);
    heroGroupComponent.addHero(heroes[1]);
    heroGroupComponent.addHero(heroes[2]);
    // heroGroupComponent.addHero(heroes[3]);
    // heroGroupComponent.addHero(heroes[4]);
    // heroGroupComponent.addHero(heroes[5]);

    // heroGroupComponent.clear(2);
    // heroGroupComponent.clear(4);

    console.log(heroGroupComponent);
    // console.log(heroGroupComponent.heroesCount);
}

export function testLocation() {
    let container = createEndPlayerContainer();
    let gameObjectFactory = container.get<GameObjectFactory>('player.gameObjectFactory');
    let idGenerator = container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator');
    let heroFactory = container.get<HeroFactory>('player.heroFactory');
    let itemStackFactory = container.get<ItemStackFactory>(ContainerKey.ItemStackFactory);
    // let itemStorageFactory = container.get<BasicItemStorageFactory>('player.heroFactory');
    let itemStorageManager = container.get<ItemStorageManager>(ContainerKey.ItemStorageManager);
    let itemStorage = container.get<ItemStorageFactoryInterface>('player.itemStorageFactory').create(2);
    container.get<MainItemStorageListComponent>('player.itemStorageCollection').add(itemStorage);
    // debugItemStorages(itemStorageManager.itemStorages);

    let heroes = [
        // heroFactory.create('warrior'),
        // heroFactory.create('rogue'),
        // heroFactory.create('gunslinger'),
        // heroFactory.create('mage'),
        // heroFactory.create('mage'),
        // heroFactory.create('warrior'),
    ];

    // locationComponent.start();
    // locationComponent.start();
    // console.log(location);
    // console.log(location);
}

export function testLocationFactory() {
    // console.log(ItemGatheringPointType);
    // console.log(ItemGatheringPointTypeValues);

    // let values = {
    //     low: 16,
    //     normal: 32,
    //     high: 64,
    // };
    // console.log(values);
    // console.log(values[ItemGatheringPointType.low]);

    // let values: Readonly<GatheringItemPointTypeValues> = {
    //     [GatheringItemPointType.low]: 50,
    //     [GatheringItemPointType.normal]: 100,
    //     [GatheringItemPointType.high]: 200,
    // };
    // console.log(values);

    // let locationFactory = new LocationFactory(
    //
    // );
    // let location = locationFactory.create(1);

    // let heroGroupComponent = new HeroGroupComponent(
    //     42,
    //     5,
    // );
    // console.log(heroGroupComponent);
}

class TestConstructorOverload {
    // _foo: [];
    //
    // constructor(a: number, b: number);
    // constructor(a: number) {
    //     this._foo = [];
    //     if (b !== undefined) {
    //         this._foo.push(a, b);
    //     } else {
    //         this._foo.push(a);
    //     }
    // }
    constructor(timestamp: number);
    constructor(m: number, d: number, y: number);
    constructor(mOrTimestamp: number, d?: number, y?: number) {
        if (d !== undefined && y !== undefined) {
            console.log('3');
            // return new Date(y, mOrTimestamp, d);
        } else {
            console.log('1,2');
            // return new Date(mOrTimestamp);
        }
    }
}

export function testConstructorOverload() {
    // let a = new TestConstructorOverload(1);
    // let a = new TestConstructorOverload(1, 2);
    // let a = new TestConstructorOverload();
    // console.log(a);
}

export function testSymbol() {
    let user = {
        name: 'ivar',
    };
    let id = Symbol('id');
    user[id] = 42;

    console.log(user);
    console.log(id);
    console.log(user['id']);
    console.log(user[id]);
}

// class IDComponent {
//     private _id: number;
//
// }

class HeroClass {
    private _name: string;
    private _health: number;

    get name(): string {
        return this._name;
    }

    get health(): number {
        return this._health;
    }

    constructor(name: string, health: number) {
        this._name = name;
        this._health = health;
    }

    damage(value: number) {
        this._health -= value;
    }
}

export function testPrototypeInherit() {
    testPersonInherit();
    // testHeroInherit();
}

function getStartedPrototypeInherit() {
    // Создаём некий объект
    let person = new Object();
    person['name'] = "John";
    person['speak'] = function()
    {
        return ("Hi, I'm " + this['name']);
    };

    // Создаём объект с прототипом person
    let person1 = Object.create(person);

    console.log(Object.keys(person)); // name, speak
    console.log(Object.keys(person1)); // пусто
    console.log(person1.name);
    console.log(person1.speak());
}

function testHeroInherit() {
    let IdComponent = function(id) {
        this._id = id;
    };
    Object.defineProperty(IdComponent.prototype, "id", {
        get: function myProperty() {
            return this._id;
        }
    });
    // let idComponent = new IdComponent(42);
    // Object.defineProperty(idComponent, 'id', {get: function () {return this._id;}});
    // console.log(idComponent);
    // console.log(idComponent.id);

    let Hero = function (name, health) {
        this._name = name;
        this._health = health;
    }

    Hero.prototype.damage = function (value) {
        // console.log('this', this);
        this._health -= value;
    }

    // let hero = Object.create(idComponent);
    // let hero = Object.create(Hero);
    // let hero = Object.create(Hero);
    let hero = new Hero(HeroClassID.Warrior, 100);
    console.log('hero.prototype', hero.prototype);
    console.log('hero.__proto__', hero.__proto__);
    // hero.prototype.__proto__ = new IdComponent(4242);
    // hero.__proto__ = new IdComponent(4242);
    // Object.setPrototypeOf(Hero.prototype, IdComponent.prototype);
    // Object.setPrototypeOf(hero, IdComponent.prototype);
    // Object.setPrototypeOf(hero, idComponent);
    // Object.setPrototypeOf(hero, IdComponent.prototype);
    // Object.setPrototypeOf(hero.prototype, idComponent);
    // Object.setPrototypeOf(hero, new IdComponent(4242));
    console.log(hero);
    console.log(hero.id);
    hero.damage(12);
    // hero.damage(12);
    // hero.damage(12);
    console.log(hero);
    // console.log(hero.id);
    /**
     * Это не наследование!
     */
}

function testPersonInherit() {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.getName = function() {
        return this.name;
    }

    function Student(name, age, schoolName) {
        // вызываем функцию, передавая ей в качестве this текущий объект
        // Person.call(this, name, age);
        this.schoolName = schoolName;
    }
    Student.prototype.getSchoolName = function() {
        return this.schoolName;
    }
    Student.prototype.__proto__ = Person.prototype;

    const student = new Student('Bob', 15, 'ABC School');
    // Object.setPrototypeOf(student, Person);
    console.log(student);
    console.log(student.getSchoolName());
    console.log(student.getName());
}

export function testIDWrapper() {
    let Hero = function (name, health) {
        this._name = name;
        this._health = health;
    }

    Hero.prototype.damage = function (value) {
        this._health -= value;
    }

    let hero = new Hero(HeroClassID.Warrior, 100);
    console.log(hero);

    //delete_hero - удалить героя из списка.
    //delete_item - удалить предмет из сумки. Нужен не id предмета, а слот.
    //remove_equip [equip]

    // hero.components.id
    // hero.components.alias
    // hero.components.heroClass
    // hero.components.equipSlots.head;
    // hero.components.equipSlots.rightHand;
    // hero.components.equipSlots.leftHand.clear;
    // hero.components.equipSlots.['leftHand'].clear;  //'leftHand' - приходит из команды от пользователя.
    // hero.components.attibutes.strength.baseValue;   //.strength - это не итоговое значение, а объект.
    // hero.components.attibutes.strength.finalValue;
    //
    // itemStorage.components.slots.get(10).placeItemStack(itemStack);
    // itemStorage.components.slots.get(10).clear();
}

interface CatInfoInterface {
    age: number;
    breed: string;
}

class CatInfo {
    age: number;
    breed: string;

    constructor(age: number, breed: string) {
        this.age = age;
        this.breed = breed;
    }
}

type CatName = "miffy" | "boris" | "mordred";
enum CatNameEnum {
    miffy = 'miffy',
    boris = 'boris',
    mordred = 'mordred',
}

// const cats: Record<CatName, CatInfoInterface> = {
// const cats: Record<CatNameEnum, CatInfoInterface> = {
//     miffy: { age: 10, breed: "Persian" },
//     boris: { age: 5, breed: "Maine Coon" },
//     mordred: { age: 16, breed: "British Shorthair" },
// };
// const cats: Record<Partial<CatNameEnum>, CatInfo> = {
const cats: Record<string, CatInfo> = {
    [CatNameEnum.miffy]: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    // mordred: { age: 16, breed: "British Shorthair" },
};