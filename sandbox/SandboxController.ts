import ContainerInterface from '../core/source/ContainerInterface.js';
import Container from '../core/source/Container.js';
import DefaultContainerConfigure from '../core/app/DefaultContainerConfigure.js';
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import PlayerContainerConfigure from '../core/app/PlayerContainerConfigure.js';
import _ from 'lodash';
import ItemDatabase from '../core/app/ItemDatabase.js';
import Item from '../core/app/Entities/Item.js';
import {ItemID} from '../core/types/enums/ItemID.js';
import ItemCategoryFactory from '../core/app/Factories/EntityFactories/ItemCategoryFactory.js';
import {ItemCategoryID} from '../core/types/enums/ItemCategoryID.js';
import EntityManager from '../core/source/EntityManager.js';
import HeroClassFactory from '../core/app/Factories/EntityFactories/HeroClassFactory.js';
import {HeroClassID} from '../core/types/enums/HeroClassID.js';
import {HeroRoleID} from '../core/types/enums/HeroRoleID.js';
import {ArmorMaterialID} from '../core/types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../core/types/enums/CharacterAttributeID.js';
import EntityManagerBuilder from '../core/app/Services/EntityManagerBuilder.js';
import {ContainerKey} from '../core/types/enums/ContainerKey.js';
import EquipSlotEntityFactory from '../core/app/Factories/EntityFactories/EquipSlotEntityFactory.js';
import {EquipSlotID} from '../core/types/enums/EquipSlotID.js';
import debug from 'debug';
import {DebugNamespaceID} from '../core/types/enums/DebugNamespaceID.js';
import AddItemInterface from '../core/app/Interfaces/AddItemInterface.js';
import {unsigned} from '../core/app/types.js';

export default class SandboxController {
    private _container: ContainerInterface;

    init() {
        this._container = new Container();
        (new DefaultContainerConfigure()).configure(this._container);
        (new CoreContainerConfigure()).configure(this._container);
        (new PlayerContainerConfigure()).configure(this._container);
    }

    run() {
        this.main();
    }

    main() {
        // console.log('Hello, World!!');
        // this.devNewItemStorage();
        // this._devItemDatabase();
        this._devInstanceofInterface();

        // this._test1();
        // this._testNewEntityManager();
        // this._testEnumKey();
        // this._testDebugNamespace();
    }

    private _test1() {
        let a = [
            {id: 42, name: 'value 42'},
            {id: 43, name: 'value 43'},
            {id: 44, name: 'value 44'},
        ];

        // let o = {
        //     42: {id: 42, name: 'foo'},
        //     43: {id: 43, name: 'foo'},
        // };

        let o = _.keyBy(a, function(o) {
            return o.id;
        });
        console.log(a);
        console.log(o);
    }

    private _devItemDatabase() {
        let itemDatabase = new ItemDatabase({
            'Wood': new Item(
                'Wood',
                '',
                '',
                11,
                11,
                11,
                undefined,
                undefined,
                undefined,
                undefined,
            ),
        });
        console.log(itemDatabase);
        console.log(itemDatabase.get(ItemID.Wood));
        console.log(itemDatabase.get(ItemID.IronOre));
    }

    private _testNewEntityManager() {
        let container = new Container();
        let entityManager = new EntityManager();

        (new EntityManagerBuilder(
            container,
            entityManager,
        )).build();
        console.log(entityManager);
        // let equipSlotFactory = new EquipSlotEntityFactory(entityManager);
        // equipSlotFactory.createArmorSlot(
        //     EquipSlotID.Head,
        //     'Голова',
        //     500,
        //     [
        //         // ItemCategoryID.Helmets,
        //     ],
        // );
        // console.log(entityManager);
    }

    private _testEnumKey() {
        let itemCategories: {[id in HeroClassID]?: number};
        itemCategories = {
            // [HeroClassID.Archer]: 42,
        };
        itemCategories['Archer'] = 42;
        console.log(itemCategories);
    }

    private _testDebugNamespace() {
        debug(DebugNamespaceID.Debug)('this is ' + DebugNamespaceID.Debug);
        debug(DebugNamespaceID.Log)('this is ' + DebugNamespaceID.Log);
        debug(DebugNamespaceID.Info)('this is ' + DebugNamespaceID.Info);
        debug(DebugNamespaceID.Warring)('this is ' + DebugNamespaceID.Warring);
        debug(DebugNamespaceID.Error)('this is ' + DebugNamespaceID.Error);
    }

    private _devInstanceofInterface() {
        let item: AddItemInterface = {
            addItem(item: Item, count: unsigned): unsigned {
                return 0;
            },
            moveItemsTo(target: AddItemInterface) {
            }
        };
        // console.log(item);
        // console.log(item.hasOwnProperty('addItem'));
        // console.log(item.hasOwnProperty('addItem1'));
        // console.log(item.hasOwnProperty(AddItemInterfaceType.addItem.name));
        // console.log(item instanceof AddItemInterface);
        // console.log(item. instanceof AddItemInterfaceTy);
        // console.log(AddItemInterface.name);
    }
}