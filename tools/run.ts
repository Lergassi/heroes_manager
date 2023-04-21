#!/usr/bin/env node
import debug from 'debug';
import dotenv from 'dotenv';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import CoreContainerConfigure from '../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import DefaultContainerConfigure from '../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import Container from '../core/source/Container.js';
import {generate_items_by_patterns} from './scripts/generate_items_by_patterns.js';

dotenv.config();
debug.enable(process.env['DEBUG']);

let container = new Container();
(new DefaultContainerConfigure()).configure(container);
(new CoreContainerConfigure()).configure(container);

yargs(hideBin(process.argv))
    .command('generate_equip', '', (yargs) => {
        return yargs
            // .positional('only_generate', {
            //     // describe
            // })
            ;
    }, (argv) => {
        generate_items_by_patterns(container, {
            onlyGenerate: Boolean(argv['g']) ?? false,
        });
    })
    .option('only_generate', {
        alias: 'g',
        type: 'boolean',
    })
    .parse()
;

yargs(hideBin(process.argv))
    .command('generate_enum_item_ids', '', (yargs) => {
        return yargs;
    }, (argv) => {

    })
    .parse()
;