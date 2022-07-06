import 'reflect-metadata';

function log(target, name, descriptor) {
    console.log('this is decorator');
    // descriptor.writable = false;
    return descriptor;
}

function Type(type) {
    return Reflect.metadata("design:type", type);
}

function ReturnType(type) { return Reflect.metadata("design:returntype", type); }

// @Reflect.metadata('save', 'save.value')
// @Reflect.metadata('save', () => {
//     // console.log(this);
//     return 42;
// })
export default class ClassA {
    private _id;
    private _name: string;
    private _alias: string;
    private _description: string;
    private _sort: number;

    constructor(
        id,
        name: string,
        alias: string,
        description: string,
        sort: number,
    ) {
        this._id = id;
        this._name = name;
        this._alias = alias;
        this._description = description;
        this._sort = sort;
    }

    @Reflect.metadata('metadataKey', 'Hello, World!')
    method() {
        console.log('this is method');
        return 42;
    }

    @Type(String)
    @ReturnType(String)
    get name() {
        return this._name;
    }

    // @log
    test1() {
        return 42;
    }

    debug(debugContainer) {
        //Нужен доступ к переменным. Он есть только в этом файле.
        // debugContainer.push();
        let d = [
            'ArmorMaterialRepository.length: 3',
            {_id: 1, name: 'Латы', alias: 'plate'},     //this._items[0].debug()
            {_id: 1, name: 'Кожа', alias: 'leather'},   //this._items[1].debug()
            {_id: 1, name: 'Ткань', alias: 'cloth'},    //this._items[2].debug()
        ];

        return d;
    }
}