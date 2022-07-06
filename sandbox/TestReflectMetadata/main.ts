import ClassA from './ClassA.js';
import 'reflect-metadata';

// Reflect.defineMetadata('metadataKey', 'metadataValue', ClassA.prototype, 'method');

let classA = new ClassA(
    42,
    'Латы',
    'plate',
    '',
    500,
);
console.log(classA);
console.log(classA['_name']);
// classA.method();

// let metadataValue = Reflect.getMetadata('metadataKey', classA, 'method');
// let metadataValue = Reflect.getMetadata('save', classA);
// let save = Reflect.getMetadata('save', ClassA);
// console.log('save', save);
// console.log('save', save());

// console.log(Reflect.getMetadata('save', ClassA));
// console.log(Reflect.hasMetadata('save', classA));
// console.log(Reflect.hasMetadata('save', ClassA));
// console.log(Reflect.hasMetadata('save', classA, 'method'));
// console.log(Reflect.hasMetadata('metadataKey', classA));
// console.log(Reflect.hasMetadata('metadataKey', classA, 'method'));
// console.log(Reflect.getOwnMetadataKeys(ClassA));
// console.log(Reflect.getOwnMetadataKeys(classA, 'method'));

// let types = Reflect.getMetadata("design:returntype", classA, 'name');
// console.log('design:returntype', types);
// types();
// console.log(types());

// console.log(Reflect.get(classA, 'test1'));