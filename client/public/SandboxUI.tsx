import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import Production from '../../core/app/Components/Craft/Production.js';
import ItemStorage from '../../core/app/Components/ItemStorages/ItemStorage.js';
import ItemStorageController from '../../core/app/Components/ItemStorages/ItemStorageController.js';
import Location from '../../core/app/Components/Location.js';
import MainHeroList from '../../core/app/Components/MainHeroList.js';
import MainLocationList from '../../core/app/Components/MainLocationList.js';
import Tavern from '../../core/app/Components/Tavern.js';
import TavernController from '../../core/app/Components/TavernController.js';
import HeroClass from '../../core/app/Entities/HeroClass.js';
import EnemyFactory from '../../core/app/Factories/EnemyFactory.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import ItemStorageFactory from '../../core/app/Factories/ItemStorageFactory.js';
import LocationFactory from '../../core/app/Factories/LocationFactory.js';
import WalletFactory from '../../core/app/Factories/WalletFactory.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import ItemStorageInterface from '../../core/app/Interfaces/ItemStorageInterface.js';
import WalletInterface from '../../core/app/Interfaces/WalletInterface.js';
import CoreContainerConfigure from '../../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import DefaultContainerConfigure from '../../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import PlayerContainerConfigure from '../../core/app/Services/ContainerConfigures/PlayerContainerConfigure.js';
import Container from '../../core/source/Container.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import AppError from '../../core/source/Errors/AppError.js';
import GameObject from '../../core/source/GameObject.js';
import GameObjectStorage from '../../core/source/GameObjectStorage.js';
import ItemDatabase from '../../core/source/ItemDatabase.js';
import {ComponentID} from '../../core/types/enums/ComponentID.js';
import {EnemyTypeID} from '../../core/types/enums/EnemyTypeID.js';
import {EntityID} from '../../core/types/enums/EntityID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import {LocationTypeID} from '../../core/types/enums/LocationTypeID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import ClientContainerConfigure from '../app/ClientContainerConfigure.js';
import UIUpdater from '../app/UIUpdater.js';
import ItemStorageControllerRC from './RC/ItemStorageControllerRC.js';
import ItemStorageRC from './RC/ItemStorageRC.js';
import ItemStorageRC_Legacy from './RC/ItemStorageRC_Legacy.js';
import LeftSidebarRC from './RC/LeftSidebarRC.js';
import ProductionRC from './RC/ProductionRC.js';
import TavernRC from './RC/TavernRC.js';

function Hello(props) {
    console.log('Hello.this', this);
    return <h1>Hello, {props.name ?? 'asd'}</h1>;
    // return React.createElement('div', null, `Hello ${props?.name ?? 'noname'}`);
}

export default class SandboxUI {
    private readonly _container: ContainerInterface;
    private _root: Root;

    private _updateUIIntervalID;

    constructor() {
        let container = new Container();

        (new DefaultContainerConfigure()).configure(container);
        (new ClientContainerConfigure()).configure(container);
        (new CoreContainerConfigure()).configure(container);
        (new PlayerContainerConfigure()).configure(container);

        this._container = container;

        //@dev
        window['app'] = {};
        window['app']['container'] = this._container;
        window['app']['clientRender'] = this;
        window['app']['sandbox'] = {};
        // window['_sandbox']['ui'] = {};

        // window['app']['ui'] = {};
        // window['app']['ui']['startUpdate'] = () => {
        //     debug(DebugNamespaceID.Log)('startUpdate');
        //     this._updateUIIntervalID = setInterval(() => {
        //         //todo: Сделать отдельный класс для добавление/удаления компоненток для обновления.
        //         this._container.get<ItemStorageControllerRC>(ServiceID.UI_ItemStorageController)?.updateByRequest();
        //         this._container.get<ItemStorageRC>(ServiceID.UI_ItemStorage + '.0')?.updateByRequest();
        //         this._container.get<ItemStorageRC>(ServiceID.UI_ItemStorage + '.1')?.updateByRequest();
        //         this._container.get<ItemStorageRC>(ServiceID.UI_ItemStorage + '.2')?.updateByRequest();
        //
        //         this._container.get<DetailHeroRC>(ServiceID.UI_DetailHero)?.updateByRequest();
        //         this._container.get<MainHeroListRC>(ServiceID.UI_MainHeroList)?.updateByRequest();
        //         this._container.get<DetailLocationRC>(ServiceID.UI_DetailLocation)?.updateByRequest();
        //         this._container.get<MainLocationListRC>(ServiceID.UI_MainLocationList)?.updateByRequest();
        //     }, 100);
        // };
        // window['app']['ui']['stopUpdate'] = () => {
        //     debug(DebugNamespaceID.Log)('stopUpdate');
        //     clearInterval(this._updateUIIntervalID);
        // };
        //
        // window['app']['ui']['startUpdate']();
    }

    async run() {
        let domContainer = document.getElementById('root');
        if (!domContainer) {
            throw AppError.rootElementNotFound()
        }
        this._root = ReactDOM.createRoot(domContainer);

        // await this._container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_stub_objects);

        // this.uiGetStarted();
        // this.testWithoutJSX();

        // this.devLayout();
        // this._renderItemStorageController();

        // this.devItemStorage();
        // this._devItemStorageController();

        // this.devDetailHero();
        // this.devMainHeroList();

        // this._devDetailLocation();
        // this._devMainLocationList();

        // this._devTavern();
        this._devProduction();

        this._container.get<UIUpdater>(ServiceID.UI_Updater).run();
    }

    uiGetStarted() {
        // let domContainer = document.getElementById('root');
        // if (!domContainer) {
        //     throw AppError.rootElementNotFound()
        // }
        //
        // let root = ReactDOM.createRoot(domContainer);

        let size = 20;
        let itemStorage = this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).createGameObject(size);

        //todo: В заготовки.
        itemStorage.get<ItemStorage>(ComponentID.ItemStorage)._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.Wood), 12);
        itemStorage.get<ItemStorage>(ComponentID.ItemStorage)._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.WoodBoards), 12);
        itemStorage.get<ItemStorage>(ComponentID.ItemStorage)._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.IronOre), 12);
        itemStorage.get<ItemStorage>(ComponentID.ItemStorage)._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.OneHandedSword01), 5);
        itemStorage.get<ItemStorage>(ComponentID.ItemStorage)._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.PlateHelmet01), 5);

        // itemStorage.get<ItemStorageInterface>(ComponentID.ItemStorageComponent).show();
        // console.log(itemStorage);

        window['_sandbox']['update'] = [];

        // window['_sandbox']['test_itemStorageSlotUIManualCreated'] = () => {
        //     // itemStorageSlotUIManualCreated.updateItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);
        //     // console.log('itemStorageSlotUIManualCreated', itemStorageSlotUIManualCreated);
        //     // console.log('element', element);
        //     // itemStorageSlotUIManualCreated.((window['_container'] as ContainerInterface).get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);
        //     console.log('update this', this);
        // };
        // window['_sandbox']['testAccess'] = (index, item, count) => {
        //     element.type.prototype?.updateSlot(index, item, count);
        // };

        // let columns = 5;
        let columns = 10;
        return this._root.render(
            <div>
                <ItemStorageRC_Legacy
                    // size={size}
                    size={100}
                    columns={columns}
                />
            </div>
        );
    }

    private testWithoutJSX() {
        let domContainer = document.getElementById('root');
        if (!domContainer) {
            throw AppError.rootElementNotFound()
        }

        // let root = ReactDOM.createRoot(domContainer);
        // root.render(<div>4242</div>);

        const root = ReactDOM.createRoot(document.getElementById('root'));
        // root.render(React.createElement(Hello, {toWhat: 'World'}, null));
        // let hello = new Hello({});
        let element = React.createElement(Hello);
        // let element = React.createElement(hello);
        let element1 = React.createRef();
        console.log('element', element);
        root.render(element);
    }

    private devLayout() {
        return this._root.render(
            <div>
                <div className={'header'}>
                    <div className={'header__site-title'}>
                        HEROES MANAGER
                    </div>
                </div>
                <div className={'container'}>
                    <LeftSidebarRC
                        // items={menuItems}
                        container={this._container}
                    />
                    <div className={'content'}>
                        {/*<Lorem/>*/}

                        {/*<div className={'widget'}>*/}
                        {/*    <div className={'widget__title'}>*/}
                        {/*        Кнопки*/}
                        {/*    </div>*/}
                        {/*    <div className={'widget__content'}>*/}
                        {/*        <Buttons/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className={'widget'}>*/}
                        {/*    <div className={'widget__title'}>*/}
                        {/*        Хранилище*/}
                        {/*    </div>*/}
                        {/*    <div className={'widget__content'}>*/}
                        {/*        <ItemStorageRC*/}
                        {/*            size={20}*/}
                        {/*            columns={4}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className={'widget'}>*/}
                        {/*    <div className={'widget__title'}>*/}
                        {/*        Список героев*/}
                        {/*    </div>*/}
                        {/*    <div className={'widget__content'}>*/}
                        {/*        <DetailHeroListRC*/}

                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className={'widget'}>*/}
                        {/*    <div className={'widget__title'}>*/}
                        {/*        Локация*/}
                        {/*    </div>*/}
                        {/*    <div className={'widget__content'}>*/}
                        {/*        <LocationRC*/}

                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={'widget'}>*/}
                        {/*    <div className={'widget__title'}>*/}
                        {/*        Локация*/}
                        {/*    </div>*/}
                        {/*    <div className={'widget__content'}>*/}
                        {/*        <LocationRC*/}

                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={'widget'}>*/}
                        {/*    <div className={'widget__title'}>*/}
                        {/*        Локация*/}
                        {/*    </div>*/}
                        {/*    <div className={'widget__content'}>*/}
                        {/*        <LocationRC*/}

                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={'widget'}>*/}
                        {/*    <div className={'widget__title'}>*/}
                        {/*        Локация*/}
                        {/*    </div>*/}
                        {/*    <div className={'widget__content'}>*/}
                        {/*        <LocationRC*/}

                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>{/*content*/}
                </div>{/*container*/}
            </div>
        );
    }

    private devItemStorage() {
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let itemStorageFactory = this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory);
        // let itemStorage = this._container.get<GameObject>(ContainerID.StubItemStorage01);
        // let itemStorage = this._container.get<StubFactory>(ServiceID.StubFactory).createDefaultItemStorage();
        // let itemStorage = new ItemStorageV2(20);
        let itemStorageGO = itemStorageFactory.createGameObject(20);

        let itemStorage = itemStorageGO.get<ItemStorageInterface>(ComponentID.ItemStorage)
        itemStorage._addItem(ItemID.Wood, 12);
        itemStorage._addItem(ItemID.IronOre, 12);
        itemStorage._addItem(ItemID.IronOre, 12);
        itemStorage._addItem(ItemID.Wood, 12);
        itemStorage._addItem(ItemID.Wood, 12);
        itemStorage._addItem(ItemID.OneHandedSword01, 5);
        itemStorage._addItem(ItemID.Leather01, 12);
        itemStorage._addItem(ItemID.Leather01, 12);
        itemStorage._addItem(ItemID.Leather01, 12);

        this._root.render(
            <div>
                <ItemStorageRC
                    ID={ServiceID.UI_ItemStorage + '.0'}
                    size={20}
                    itemStorage={itemStorage}
                    itemStorageID={String(itemStorageGO.ID)}
                    container={this._container}
                />
            </div>
        );
    }

    private _devItemStorageController() {
        let itemStorageController = new ItemStorageController(100);
        itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).createGameObject(20));
        itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).createGameObject(20));
        itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).createGameObject(20));

        let count = 40;
        itemStorageController._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.Wood), count);
        itemStorageController._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.Wood), count);
        itemStorageController._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.Wood), count);
        itemStorageController._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.IronOre), count);
        itemStorageController._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.Wood), count);
        itemStorageController._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.IronOre), count);
        itemStorageController._addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.Wood), count);

        window['app']['sandbox']['itemStorageController'] = itemStorageController;

        this._root.render(
            <div>
                <ItemStorageControllerRC
                    itemStorageController={itemStorageController}
                    container={this._container}
                    window={{show: true}}
                />
            </div>
        );
    }

    // private async _renderItemStorageControllerFromContainer() {
    //     let itemStorageController = this._container.get<ItemStorageControllerInterface>(ServiceID.ItemStorageController);
    //     itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(20));
    //     itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(20));
    //     itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(20));
    //
    //     await this._container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.Wood, '12']);
    //     await this._container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.Wood, '12']);
    //     await this._container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.IronOre, '42']);
    //     await this._container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.IronOre, '42']);
    //     await this._container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.IronOre, '42']);
    //     await this._container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item, [ItemID.IronOre, '300']);
    //
    //     this._root.render(
    //         <div>
    //             <ItemStorageControllerRC
    //                 itemStorageController={itemStorageController}
    //             />
    //         </div>
    //     );
    // }

    private devMainHeroList() {
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this._container.get<HeroFactory>(ServiceID.HeroFactory);

        let mainHeroList = new MainHeroList(
            this._container.get<GameObjectStorage>(ServiceID.GameObjectStorage),
            this._container.get<HeroFactory>(ServiceID.HeroFactory),
            100,
        );

        // mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));
        // mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));
        // mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));
        // mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));
        // mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));

        let maxHeroes = 45;
        let i = 0;
        while (i < maxHeroes) {
            mainHeroList.addHero(heroFactory.createRandom(1));
            i++;
        }

        this._root.render(
            <div>
                {/*<MainHeroListRC_Legacy*/}
                {/*    container={this._container}*/}
                {/*    mainHeroList={mainHeroList}*/}
                {/*/>*/}
                {/*<MainHeroListRC*/}
                {/*    container={this._container}*/}
                {/*    mainHeroList={mainHeroList}*/}
                {/*/>*/}
            </div>
        );
    }

    private devDetailHero() {
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this._container.get<HeroFactory>(ServiceID.HeroFactory);

        let warrior = heroFactory.create(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Warrior), 1);
        let rogue = heroFactory.create(em.get<HeroClass>(EntityID.HeroClass, HeroClassID.Rogue), 1);

        let mainHeroList = new MainHeroList(
            this._container.get<GameObjectStorage>(ServiceID.GameObjectStorage),
            this._container.get<HeroFactory>(ServiceID.HeroFactory),
            100,
        );
        // mainHeroList.addHero(warrior);
        // mainHeroList.addHero(rogue);

        // let maxHeroes = 45;
        // let i = 0;
        // while (i < maxHeroes) {
        //     mainHeroList.addHero(heroFactory.createRandom(1));
        //     i++;
        // }

        mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));
        mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));
        mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));
        mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));
        mainHeroList.addHero(heroFactory.create(HeroClassID.Warrior, 1));

        window['app']['sandbox']['warrior'] = warrior;
        window['app']['sandbox']['rogue'] = rogue;
        // window['app']['sandbox']['newHero'] = () => {
        //     mainHeroList.addHero(heroFactory.createRandom(1));
        // };

        // this.detailHeroRCHandler = this.detailHeroRCHandler.bind(this);

        this._root.render(
            <div>
                {/*<DetailHeroRC*/}
                {/*    container={this._container}*/}
                {/*/>*/}
                {/*<MainHeroListRC*/}
                {/*    container={this._container}*/}
                {/*    mainHeroList={mainHeroList}*/}
                {/*    detailHeroRCHandler={this.detailHeroRCHandler}  //state up*/}
                {/*/>*/}
            </div>
        );
    }

    detailHeroRCHandler(hero: GameObject): void {
        window['app']['sandbox'][ServiceID.UI_DetailHero]['updateHero'](hero);
    }

    private _devDetailLocation() {
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this._container.get<HeroFactory>(ServiceID.HeroFactory);
        let locationFactory = this._container.get<LocationFactory>(ServiceID.LocationFactory);
        let enemyFactory = this._container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let location = locationFactory.create(LocationTypeID.Forrest, 1);

        location.get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.Warrior, 1));
        location.get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.Rogue, 1));
        location.get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.FireMage, 1));
        location.get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.Gunslinger, 1));
        location.get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.Support1, 1));

        location.get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));
        location.get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));
        location.get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));
        location.get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));
        location.get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));

        console.log('location', location);

        window['app']['sandbox']['location1'] = location;

        this._root.render(
            <div>
                {/*<DetailLocationRC*/}
                {/*    container={this._container}*/}
                {/*/>*/}
                {/*<LocationRC*/}

                {/*/>*/}
            </div>
        );
    }

    private _devMainLocationList() {
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this._container.get<HeroFactory>(ServiceID.HeroFactory);
        let locationFactory = this._container.get<LocationFactory>(ServiceID.LocationFactory);
        let enemyFactory = this._container.get<EnemyFactory>(ServiceID.EnemyFactory);
        let itemStorageFactory = this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory);
        let walletFactory = this._container.get<WalletFactory>(ServiceID.WalletFactory);

        let mainLocationList = new MainLocationList(100);
        let itemStorage = itemStorageFactory.createGameObject(100);
        let wallet = walletFactory.create(0);

        let locations = [
            locationFactory.create(LocationTypeID.Forrest, 1),
            locationFactory.create(LocationTypeID.Forrest, 1),
            locationFactory.create(LocationTypeID.Forrest, 1),
            locationFactory.create(LocationTypeID.Forrest, 1),
            locationFactory.create(LocationTypeID.Forrest, 1),
        ];

        for (let i = 0; i < locations.length; i++) {
            locations[i].get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.Warrior, 1));
            locations[i].get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.Rogue, 1));
            locations[i].get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.Gunslinger, 1));
            locations[i].get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.Support2, 1));
            locations[i].get<Location>(ComponentID.Location).addHero(heroFactory.create(HeroClassID.Support1, 1));

            locations[i].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));
            locations[i].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));
            locations[i].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));
            locations[i].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));
            locations[i].get<Location>(ComponentID.Location).addEnemy(enemyFactory.createSquad(EnemyTypeID.Bear, 1));
        }

        for (let i = 0; i < locations.length; i++) {
            mainLocationList.add(locations[i]);
        }

        window['app']['sandbox']['locations'] = locations;
        window['app']['sandbox']['mainLocationList'] = mainLocationList;
        window['app']['sandbox']['allStart'] = () => {
            for (let i = 0; i < locations.length; i++) {
                locations[i].get<Location>(ComponentID.Location).startHunting();
            }
        };
        window['app']['sandbox']['allStop'] = () => {
            for (let i = 0; i < locations.length; i++) {
                locations[i].get<Location>(ComponentID.Location).stopHunting();
            }
        };
        window['app']['sandbox']['allGetRewards'] = () => {
            for (let i = 0; i < locations.length; i++) {
                locations[i].get<Location>(ComponentID.Location).getReward({
                    itemStorage: itemStorage.get<ItemStorageInterface>(ComponentID.ItemStorage),
                    wallet: wallet.get<WalletInterface>(ComponentID.Wallet),
                });
            }
            console.log(itemStorage);
            console.log(wallet);
        };

        this._root.render(
            <div>
                {/*<MainLocationListRC*/}
                {/*    container={this._container}*/}
                {/*    mainLocationList={mainLocationList}*/}
                {/*/>*/}
                {/*<MainLocationListRC*/}
                {/*    container={this._container}*/}
                {/*    mainLocationList={mainLocationList}*/}
                {/*/>*/}
            </div>
        );
    }

    private _devTavern() {
        let tavern = new Tavern();

        // tavern.add(HeroClassID.Warrior, 3);
        // tavern.add(HeroClassID.FireMage, 3);
        // tavern.add(HeroClassID.Gunslinger, 0);
        // tavern.add(HeroClassID.Warrior, 4);
        // tavern.add(HeroClassID.Support1, 1);
        console.log(tavern);

        window['app']['sandbox']['tavern'] = tavern;
        window['app']['sandbox']['tavernController'] = new TavernController(tavern);

        this._root.render(
            <div>
                <TavernRC
                    container={this._container}
                    tavern={tavern}
                    window={{show: true}}
                />
            </div>
        );
    }

    private _devProduction() {
        let production = this._container.get<Production>(ServiceID.Production);
        // let itemStorageController = this._container.get<ItemStorageInterface>(ServiceID.ItemStorageController);
        let itemStorage = this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(200);
        itemStorage.addItem(ItemID.IronIngot, 42424242);

        this._root.render(
            <div>
                <ProductionRC
                    container={this._container}
                    production={production}
                    playerItemStorage={itemStorage}
                    window={{show: true}}
                />
            </div>
        );
    }
}