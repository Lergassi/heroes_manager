#!/usr/bin/env node
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import SandboxController from './SandboxController.js';
import dotenv from 'dotenv';
import debug from 'debug';

dotenv.config();
debug.enable(process.env['DEBUG']);

// const argv = yargs(hideBin(process.argv)).argv

let sandbox = new SandboxController();
sandbox.run();

type Command = {
    name: string,
    target?: string,
};

/**
 * Названия команд нужны для регистрации.
 */
let commands: Command[] = [
    {name: 'main',},
    {name: 'devLocationFactory',},
    {name: 'randomItemGenerator',},
    {name: 'itemDatabaseFilter',},
    {name: 'chanceGetStarted',},
    {name: 'testItemStackSeparate',},
    {name: 'testItemStorageComponentWithSeparate',},
    {name: 'testHeroFactory',},
    {name: 'testLocationFactory',},
    {name: 'devHeroGroup',},
    {name: 'devEnemyFactory',},
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