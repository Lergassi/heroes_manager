// Shape — суперкласс
import ArmorMaterial from '../core/app/Entities/ArmorMaterial.js';

function Shape() {
    this.x = 0;
    this.y = 0;
}

// метод суперкласса
Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Фигура переместилась.');
};

// Rectangle — подкласс
function Rectangle() {
    Shape.call(this); // вызываем конструктор суперкласса
}

// подкласс расширяет суперкласс
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

let rect = new Rectangle();

// console.log('Является ли rect экземпляром Rectangle? ' + (rect instanceof Rectangle)); // true
// console.log('Является ли rect экземпляром Shape? ' + (rect instanceof Shape)); // true
// rect.move(1, 1); // выведет 'Фигура переместилась.'

// class ArmorMaterial {
//     _id;
//     _name;
//     constructor(id, name) {
//         this._id = id;
//         this._name = name;
//         console.log('this is ArmorMaterial.constructor() ' + {id: id, name: name}.toString());
//     }
//
//     test() {
//         console.log('this is ArmorMaterial.test() function');
//     }
//
//     static create(id, name) {
//         let armorMaterial = Object.create(ArmorMaterial.prototype);
//
//         armorMaterial._id = id;
//         armorMaterial._name = name;
//
//         return armorMaterial;
//     }
// }
//
// let id = 1;
// console.log('-'.repeat(32));
// console.log('with constructor');
// let plate1 = new ArmorMaterial(id++, 'Латы');
// console.log('plate1', plate1);
// console.log('plate1 instanceof ArmorMaterial', plate1 instanceof ArmorMaterial);
// plate1.test();
//
// console.log('-'.repeat(32));
// console.log('with Object.create');
// let plate2 = Object.create(ArmorMaterial.prototype);
// plate2['_id'] = id++;
// plate2['_name'] = 'Латы';
// console.log('plate3', plate2);
// console.log('plate2 instanceof ArmorMaterial', plate2 instanceof ArmorMaterial);
// plate2.test()
//
// console.log('-'.repeat(32));
// console.log('with Object.create in static method');
// let plate3 = ArmorMaterial.create(id++, 'Латы');
// console.log('plate3', plate3);
// console.log('plate3 instanceof ArmorMaterial', plate3 instanceof ArmorMaterial);
// plate3.test();


let id = 1;
let data = {
    id: id++,
    name: 'Латы',
    alias: 'plate',
    description: '',
    sort: 500,
};

// let plate1 = new ArmorMaterial(
//     data.id,
//     data.name,
//     data.alias,
//     data.description,
//     data.sort,
// );
// testArmorMaterial('plate1', plate1);

// let plate2 = ArmorMaterial.testLoad(data);
// testArmorMaterial('plate2', plate2)

function testArmorMaterial(name, armorMaterial) {
    console.log('-'.repeat(32));
    console.log('# test ' + name);
    console.log(name, armorMaterial);
    console.log(name + ' instanceof ArmorMaterial', armorMaterial instanceof ArmorMaterial);
}

// let a = [
//     {id: 100, name: 'this is name'},
//     {id: 200, name: 'this is name'},
//     {id: 300, name: 'this is name'},
//     {id: 400, name: 'this is name'},
//     {id: 500, name: 'this is name'},
// ];
// console.log(a.map((item) => {
//     return {
//         id: item.id,
//     };
// }));

class TestClass {

}

console.log(TestClass.name);

let o = {
    // `TestClass.name`: 42,
    // 'TestClass.name': 42,
};