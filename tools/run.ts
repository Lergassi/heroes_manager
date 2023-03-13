#!/usr/bin/env node
import {format} from 'date-fns';
import debug from 'debug';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {sprintf} from 'sprintf-js';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';
import GenerateItems from '../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_1/GenerateItems.js';
import CoreContainerConfigure from '../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import DefaultContainerConfigure from '../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import Container from '../core/source/Container.js';
import {DebugNamespaceID} from '../core/types/enums/DebugNamespaceID.js';
import {generate_items} from './scripts/generate_items.js';
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