import 'reflect-metadata';

function log(target, name, descriptor) {
    console.log('this is decorator');
    console.log('decorator.target', target);
    console.log('decorator.target._msg', target._msg);
    console.log('decorator.name', name);
    console.log('decorator.descriptor', descriptor);
    // // descriptor.writable = false;
    // return descriptor;
    const original = descriptor.value;
    if (typeof original === 'function') {
        // console.log('run sum');
        descriptor.value = function(...args) {
            console.log(`Arguments: ${args}`);
            try {
                const result = original.apply(this, args);
                console.log(`Result: ${result}`);
                return result;
            } catch (e) {
                console.log(`Error: ${e}`);
                throw e;
            }
        }
    }
    return descriptor;
}

export default class ClassA {
    private readonly _msg: string;

    get msg() {
        return this._msg;
    }

    constructor(
        msg: string = 'this is default msg',
    ) {
        this._msg = msg;
    }

    @log
    sum(a, b) {
        return a + b;
    }
}