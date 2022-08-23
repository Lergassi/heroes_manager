import assert from 'assert';

export class ClassA {
    _value;

    constructor(value) {
        this._value = value;
    }

    methodA() {

    }
}

export class ClassB extends ClassA {
    methodB() {

    }
}

export class ClassC extends ClassA {
    methodC() {

    }
}

export class ClassD {
    methodD() {

    }
}

export class Collection {
    _items: ClassA[];

    constructor() {
        // this._items = [
        //     new ClassB(10),
        //     new ClassB(20),
        //     new ClassC(30),
        // ];
    }

    // getItem<Type>(): Type {
    getItem(): ClassA {
        // return <Type>this._items[0];
        return this._items[0];
    }

    // getItemByName<Type>() {
    //     console.log(this._items[0] instanceof Type);
    // }

    // getItems<Type>(): Array<Type> {
    //     return <Type[]>[
    //         this._items[0],
    //         this._items[1],
    //     ];
    // }
}

export function devGenerics() {
    let collection = new Collection();
    // console.log(collection);
    // let item: ClassD = collection.getItem() as ClassD;
    let item: ClassB = collection.getItem() as ClassB;
    item.methodB();
    // console.log();
    // let items = collection.getItems<ClassC>();
    // items[0].methodC();
}

type TestConfig = {
    max_level: number;
    health: number;
    characters: {
        strength: number;
    }
};

export function devConfigTypes() {
    // let config: TestConfig = {
    //     max_level: 100,
    //     health: 100,
    //     characters: {
    //         strength: 10,
    //     },
    // };

    let a = {
        a: 'a',
        b: {
            aa: 'aa',
            bb: 'bb',
        },
    };

    // console.log(a.c?.a);
    let someValue = 1;
    // let someValue = 42;
    // assert(someValue === 42);
    assert(someValue === 42);
    // try {
    //     assert(someValue === 42);
    // } catch (e) {
    //     console.log(e);
    // }
    console.log('---END---');
}

export function testBooleanIncrement() {
    let length: number = 0;
    let b = true;
    // let b = false;
    // length += <number>b;
    // length += <number>b;
    // length += Number(b);
    // length += Number(b);
    length += +b;
    length += +b;
    console.log(length);
}

interface StringArray {
    [index: number]: string;
}

// interface TMetadata

export function testGenerics1() {
    const myArray: StringArray = {10: 'asd'};
    // const myArray: StringArray = {10: 'asd', a: 'asd'};
    console.log(myArray[1]);
    console.log(myArray[10]);
}

export interface TestInstanceofInterface {
// export type TestInstanceofInterface = {
    value: Number;
}

// class TestInstanceofClass {
class TestInstanceofClass implements TestInstanceofInterface {
    value: Number;
}

export function testInstanceOfInterface() {
    // let a: TestInstanceofInterface = {
    // let a: TestInstanceofClass = {
    //     value: 42,
    // };
    let a = new TestInstanceofClass();
    console.log(a);
    console.log(a instanceof TestInstanceofClass);
    // console.log(a instanceof TestInstanceofInterface);
}

export function testOptionalChaining() {
    let o = {};
    // let r = o?.foo;
    // console.log(r);
    testOptionalChainingExec(o);
}

function testOptionalChainingExec(o) {
    // console.log(o?.foo);
    // console.log(o.foo?.bar);
    // console.log(o['foo']?.bar);
    // console.log(o['foo'].bar);
    // console.log(o['foo']['bar'].alice);
    console.log(o['foo']?.['bar'].alice);
}

type StringNumberPair = [string, number];

export function testArrayTypes() {
    // doSomething(['asd',2, '']);
    // let arr: string[] = ['a', 42];
    // let arr: number[] = [42];
    // let arr: (string|number)[] = [42, 'aaa'];
    // let arr: (string|number|boolean)[] = [42, 'aaa', true];

    let simpleTypeCollection: (string|number|boolean)[] = [1,2,3, 'a', 'b', 'c', true, false, true, undefined];
    // let simpleTypeCollection: (string|number|boolean|undefined)[] = [1,2,3, 'a', 'b', 'c', true, false, true, undefined];
    console.log(simpleTypeCollection);
}

function doSomething(pair: [string, number]) {
    const a = pair[0];
    console.log(a);

    // const a: string
    const b = pair[1];
    console.log(b);
    //
    // const b: number
    // // ...
}

type FunctionType = (a: number, b: number) => number;

interface TestFunctionTypeInterface {
    value: number;
    fn?: FunctionType;
    // fn: FunctionType;
}

// function fn(a: number, b: number): number {
function fnWithNumbers(a: number, b: number): number {
    return a + b;
}

function fnWithStrings(a: string, b: string): string {
    return a + b;
}

export function testFunctionType() {
    let object: TestFunctionTypeInterface = {
        value: 42,
        // fn: (a, b) => {
        //     return a + b;
        //     // return '';
        // },
        fn: fnWithNumbers,
        // fn: fnWithStrings,
    };
}

class ItemClass<ID> {
    id: ID;

    constructor(id: ID) {
        this.id = id;
    }
}

// class ItemCategoryClass<ID, Item extends ItemClass> {
class ItemCategoryClass<T> {
    id;
    // item: ItemClass<>;
    item: ItemClass<any>;

    constructor(id: T) {
        this.id = id;
    }

    // f(item: ItemClass<typeof item['_id']>) {
    //     console.log(item.id);
    // }
}

// class T0<T, U> {} //  T0 - открытый тип
// class T1<T> {
//     public f: T0<number, T>; // T0 - открытый тип
// }

// class T1<T> {
//     public f1: T0<number, string>; // T0 - закрытый тип
// }

// let t1: T1<string> = new T1();
// t1.f1();

type Point = { x: number; y: number };
type P = keyof Point;
type P1 = Point['x'];

export function testGenericsRelations() {
    // let item = new ItemClass<number>(42);
    let item = new ItemClass<string>('this_is_id');
    let itemCategory = new ItemCategoryClass<number>(420);

    // let var1: Point = {x: 10, y: 20};
    // let var2: P = 'x';
}