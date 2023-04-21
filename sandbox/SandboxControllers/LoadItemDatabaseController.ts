import AbstractSandboxController from './AbstractSandboxController.js';
// import { parse } from 'csv-parse';
import {parse} from 'csv-parse/browser/esm';
// import data from '../../core/data/entities.json';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
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
        let entityManager = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);

        // let entityManagerBuilder = new EntityManagerBuilder(container, entityManager);
        // entityManagerBuilder.build();

        // let itemDatabaseBuilder = new ItemDatabaseBuilder(new );

    }
}