import _ from 'lodash';
import debug from 'debug';
import AbstractSandboxController from './AbstractSandboxController.js';
// import { parse } from 'csv-parse';
import {parse} from 'csv-parse/browser/esm';
import assert from 'assert';
// import data from '../../core/data/entities.json';
import itemsData from '../../core/data/items.json';
import ItemDatabaseBuilder from '../../core/app/Services/ItemDatabaseBuilder.js';
import EntityManagerBuilder from '../../core/app/Services/EntityManagerBuilder.js';
import Container from '../../core/source/Container.js';
import EntityManager from '../../core/source/EntityManager.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {ContainerID} from '../../core/types/enums/ContainerID.js';
// import data from '../../core/data/items.csv';

export default class LoadItemDatabaseController extends AbstractSandboxController {
    run(): void {
        // this._csvParserGetStarted();
        this._load();
    }

    private _csvParserGetStarted() {
        const input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"';
        parse(input, {
            comment: '#'
        }, function(err, records){
            console.log(records);
            // assert.deepStrictEqual(
            //     records,
            //     [ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]
            // );
        });
    }

    private _load() {
        // console.log(itemsData);
        // let container = new Container();
        let container = this.container;
        // let entityManager = new EntityManager();
        let entityManager = this.container.get<EntityManagerInterface>(ContainerID.EntityManager);

        // let entityManagerBuilder = new EntityManagerBuilder(container, entityManager);
        // entityManagerBuilder.build();
        console.log(entityManager);

        // let itemDatabaseBuilder = new ItemDatabaseBuilder(new );

    }
}