import assert, {AssertionError} from 'assert';

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