import AppError from '../core/source/AppError.js';
import TestThrowCommand from '../server/app/Commands/TestCommands/TestThrowCommand.js';
import Container from '../core/source/Container.js';
import Input from '../core/source/GameConsole/Input.js';

let i = 1;

function f1() {
    throw new AppError('This is f1 error.');
    console.log('this is basic function');
}

async function f2() {
    throw new AppError('This is f2 error.');
    console.log('this is async function');
}

async function testThrowCommand() {
    // throw new AppError('This is error.');
    const command = new TestThrowCommand(new Container());
    console.log(i++);
    try {
        await command.run();
        // command.run();
    } catch (e) {
        console.log('testThrowCommand catch', e);

    }
    console.log(i++);
}

async function main() {
    try {
        // throw new AppError('This is main error.');

        // console.log(i++);
        // await f2();
        // console.log(i++);

        console.log(i++);
        const command = new TestThrowCommand(new Container());
        await command.run();
        // await command.execute(new Input());
        console.log(i++);
        console.log('main end');

        // return 42;
        // return Promise.resolve(42);

        // console.log(i++);
        // // await testThrowCommand();
        // const command = new TestThrowCommand(new Container());
        // await command.run();
        // console.log(i++);

        // console.log(i++);
        // f1();
        // console.log(i++);
        // // f2();
        // await f2();
        // console.log(i++);
        // let promise = new Promise((resolve, reject) => {
        //     console.log('this is Promise');
        //     // resolve(1);
        // });
        // console.log(i++);
    } catch (e) {
        console.log('in_main_catch', e);
    }
}

main()
    .then((result) => {
        console.log('out_main.then', result);
    })
    .catch((error) => {
        console.log('out_main.catch', error);
    })
;