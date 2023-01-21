#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import SandboxController from './SandboxController.js';
import dotenv from 'dotenv';
import debug from 'debug';
import csvToJson from 'convert-csv-to-json';
import fs from 'fs';
import {sprintf} from 'sprintf-js';
import ConventItems from '../core/app/Services/Server/ConventItems.js';
import ConventItemCategories from '../core/app/Services/Server/ConventItemCategories.js';
import ConventCSVDataToJson from '../core/app/Services/Server/ConventCSVDataToJson.js';

dotenv.config();
debug.enable(process.env['DEBUG']);

yargs(hideBin(process.argv))
    .command('test [foo]', 'test command', (yargs) => {
        return yargs
            .positional('foo', {
                describe: '',
                default: 42
            })
    }, (argv) => {
        console.log(argv.foo);
    })
    .parse()

yargs(hideBin(process.argv))
    .command('test_path', '', (yargs) => {
        return yargs
            // .positional('foo', {
            //     describe: '',
            //     default: 42
            // })
    }, (argv) => {
        console.log('process.cwd()', process.cwd());
        console.log('__dirname', __dirname);
        // let root = '../';
        let root = './';
        // console.log(csvToJson);
        // let fileInputName = '../core/data/items.csv';
        // let fileInputName = root + 'items.csv';
        // let fileInputName = './items.csv';
        let fileInputName = './test';
        // let fileInputName = './test/items.csv';
        // let fileInputName = './test/text.txt';
        // let fileInputName = '/test/text.txt';
        // let fileInputName = 'items.csv';
        // let fileInputName = __dirname + '/items.csv';
        // let fileInputName = './run.js';
        // let fileOutputName = '../core/data/items.json';
        let fileOutputName = root + 'items.json';
        // let json = csvToJson.getJsonFromCsv(fileInputName);
        // console.log(json);

        let targets = [
            './data/test',
            './data/test/text.txt',
            './data/items.csv',
        ];

        // fs.stat(fileInputName, (err, stats) => {
        //     console.log(stats);
        // })

        // fileInputName = __dirname + fileInputName;
        // console.log(fileInputName, fs.existsSync(fileInputName));
        for (let i = 0; i < targets.length; i++) {
            // console.log(targets[i], fs.existsSync(targets[i]));

            // fs.access(targets[i], (err) => {
            //     if (err) {
            //         console.error('error', err)
            //         return
            //     }
            //
            //     //file exists
            //     console.log(42);
            // })

            fs.stat(targets[i], (err, stats) => {
                // console.log(stats.isDirectory());
                console.log(targets[i], stats);
            });
        }
    })
    // .option('verbose', {
    //     alias: 'v',
    //     type: 'boolean',
    //     description: 'Run with verbose logging'
    // })
    .parse()

yargs(hideBin(process.argv))
    .command('convent_items', '', (yargs) => {
        return yargs;
    }, (argv) => {
        let conventItems = new ConventItems();
        conventItems.run();
    })
    .parse()
;

yargs(hideBin(process.argv))
    .command('convent_item_categories', '', (yargs) => {
        return yargs;
    }, (argv) => {
        let conventItemCategories = new ConventItemCategories();
        conventItemCategories.run();
    })
    .parse()
;

yargs(hideBin(process.argv))
    .command('convent_data', '', (yargs) => {
        return yargs;
    }, (argv) => {
        let conventCSVDataToJson = new ConventCSVDataToJson();
        conventCSVDataToJson.run();
    })
    .parse()
;