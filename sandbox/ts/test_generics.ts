class ClassA<IDType, NameType> {
    // [key: string]: string | ClassB;
    id: IDType;
    name: NameType;

    constructor(id: IDType, name: NameType) {
        this.id = id;
        this.name = name;
    }
}

class ClassB {

}

type ID = number;
type Email = string;

// let a = new ClassA();
// console.log(a instanceof ClassA);
// console.log(a instanceof ClassB);

let id: ID = 42;
let email: Email = 'this is email';
// console.log(id instanceof ID);
// console.log(email);
// testOverride(id);
// testOverride(email);

function testOverride(id: ID);
function testOverride(id: Email);
function testOverride(id: ID | Email) {
    console.log(id);
}

// let r = identity(42);
// let r = identity<string>('lorem');
// console.log(r);

function identity<Type>(arg: Type): Type {
    console.log('this is identity');
    return arg;
}

let myIdentity1: <Type>(arg: Type) => Type = identity;
let myIdentity2: <Input>(arg: Input) => Input = identity;

// let r = {};
// r['0'] = myIdentity1('world');
// r['1'] = myIdentity2('world');
// console.log(r);

type NameAlias = string;

let plate: NameAlias = 'plate';
let classA = new ClassA<string, NameAlias>('42', plate);

console.log(classA);