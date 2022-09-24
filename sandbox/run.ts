#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import {SandboxController} from './SandboxController.js';
import _ from 'lodash';
import dotenv from 'dotenv';
import debug from 'debug';

dotenv.config();
debug.enable(process.env['DEBUG']);

// const argv = yargs(hideBin(process.argv)).argv

let sandbox = new SandboxController();
sandbox.init();

type Command = {
    name: string,
    target?: string,
};

let commands: Command[] = [
    {name: 'main',},
    {name: 'locationFactory',},
    {name: 'randomItemGenerator',},
    {name: 'itemDatabaseFilter',},
    {name: 'chanceGetStarted',},
    {name: 'testItemStackSeparate',},
    {name: 'testItemStorageComponentWithSeparate',},
];

for (let i = 0; i < commands.length; i++) {
    let target = commands[i].target || commands[i].name;
    yargs(hideBin(process.argv))
        .command(commands[i].name, '', (yargs) => {

        }, (argv) => {
            // sandbox[_.camelCase(commands[i].name)]();
            sandbox[commands[i].name]();
        })
        .parse();
}