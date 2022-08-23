#!/usr/bin/env node
import dotenv from 'dotenv';
import debug from 'debug';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import ServerAndCoreSandbox from './ServerAndCoreSandbox.js';
import AppError from '../core/source/AppError.js';

dotenv.config();

// debug.enable('*');
debug.enable('debug');

const argv = yargs(hideBin(process.argv)).argv
// console.log(process.argv);
// console.log(hideBin(process.argv));
// console.log(yargs(hideBin(process.argv)));
// console.log(argv);

// console.log(1);
// dotenv.config();
// console.log(2);

// if (argv['ships'] > 3 && argv['distance'] < 53.5) {
//     console.log('Plunder more riffiwobbles!')
// } else {
//     console.log('Retreat from the xupptumblers!')
// }

// let bin = hideBin(process.argv);
// if (!bin.length) {
//     bin.push('main');
// }

// yargs(hideBin(process.argv))
// // yargs(bin)
//     .command('run [command]', '', (yargs) => {
//         return yargs
//             .positional('command', {
//                 describe: '',
//                 default: 'main',
//             });
//     }, (argv) => {
//         console.log('sandbox run', argv);
//     })
//     // .option('verbose', {
//     //     alias: 'v',
//     //     type: 'boolean',
//     //     description: 'Run with verbose logging'
//     // })
//     .parse();

let sandbox = new ServerAndCoreSandbox();
// console.log('sandbox', sandbox);

yargs(hideBin(process.argv))
    .command('$0 [name]', 'the default command', () => {}, (argv) => {
        // console.log('this command will be run by default')
        // console.log('name', argv['name'])
        if (argv['name'] && sandbox[argv['name'].toString()]) {
            sandbox[argv['name'].toString()]();
        } else {
            throw new AppError('Неверное указана команда.');
        }
    })
    // .command('run [name]', '', (yargs) => {
    //     // return yargs
    //     //     .positional('command', {
    //     //         describe: '',
    //     //         default: 'main',
    //     //     });
    // }, (argv) => {
    //     console.log('command run', argv);
    //     console.log('command run._', argv['_']);
    //     console.log('command run.name', argv['name']);
    // })
    // .option('verbose', {
    //     alias: 'v',
    //     type: 'boolean',
    //     description: 'Run with verbose logging'
    // })
    .parse();
