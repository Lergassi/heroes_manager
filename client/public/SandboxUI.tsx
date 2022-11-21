import React from 'react';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import AppError from '../../core/source/Errors/AppError.js';
import ReactDOM, {Root} from 'react-dom/client';
import Container from '../../core/source/Container.js';
import DefaultContainerConfigure from '../../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import ClientContainerConfigure from '../app/ClientContainerConfigure.js';
import CoreContainerConfigure from '../../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import PlayerContainerConfigure from '../../core/app/Services/ContainerConfigures/PlayerContainerConfigure.js';
import ItemStorageRC from './Components/ItemStorageRC.js';
import ItemStorageFactory from '../../core/app/Factories/ItemStorageFactory.js';
import {ComponentID} from '../../core/types/enums/ComponentID.js';
import {ContainerID} from '../../core/types/enums/ContainerID.js';
import ItemStorageV2 from '../../core/app/Components/ItemStorageV2.js';
import ItemDatabase from '../../core/source/ItemDatabase.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import MainHeroListRC from './Components/MainHeroListRC.js';
import LeftSidebarRC from './Components/LeftSidebarRC.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import Icon from '../../core/app/Entities/Icon.js';
import {EntityID} from '../../core/types/enums/EntityID.js';
import {IconID} from '../../core/types/enums/IconID.js';
import GameConsole from '../../core/source/GameConsole/GameConsole.js';
import {CommandID} from '../../core/types/enums/CommandID.js';
import GameObject from '../../core/source/GameObject.js';
import ItemStorageControllerInterface from '../../core/app/Interfaces/ItemStorageControllerInterface.js';
import ItemStorageControllerRC from './Components/ItemStorageControllerRC.js';
import ItemStorageController from '../../core/app/Components/ItemStorageController.js';
import MainHeroListComponent from '../../core/app/Components/MainHeroListComponent.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';

function Hello(props) {
    console.log('Hello.this', this);
    return <h1>Hello, {props.name ?? 'asd'}</h1>;
    // return React.createElement('div', null, `Hello ${props?.name ?? 'noname'}`);
}

export default class SandboxUI {
    private readonly _container: ContainerInterface;
    private _root: Root;

    constructor() {
        let container = new Container();

        (new DefaultContainerConfigure()).configure(container);
        (new ClientContainerConfigure()).configure(container);
        (new CoreContainerConfigure()).configure(container);
        (new PlayerContainerConfigure()).configure(container);

        this._container = container;

        //@dev
        window['_container'] = this._container;
        window['_clientRender'] = this;
        window['_sandbox'] = {};
        // window['_sandbox']['ui'] = {};
    }

    async run() {
        let domContainer = document.getElementById('root');
        if (!domContainer) {
            throw AppError.rootElementNotFound()
        }
        this._root = ReactDOM.createRoot(domContainer);

        await this._container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_stub_objects);

        // this.uiGetStarted();
        // this.testWithoutJSX();

        // this.devLayout();
        // this.devItemStorage();
        // this._renderItemStorageController();
        this.devHeroList();
    }

    uiGetStarted() {
        // let domContainer = document.getElementById('root');
        // if (!domContainer) {
        //     throw AppError.rootElementNotFound()
        // }
        //
        // let root = ReactDOM.createRoot(domContainer);

        let size = 20;
        let itemStorage = this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(size);

        //todo: В заготовки.
        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent).addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);
        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent).addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.WoodBoards), 12);
        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent).addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.IronOre), 12);
        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent).addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.OneHandedSword_01), 5);
        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent).addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.PlateHelmet_01), 5);

        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent).show();
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
                <ItemStorageRC
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
        let menuItems = [
            {name: 'Главная', icon: this._container.get<EntityManagerInterface>(ContainerID.EntityManager).get<Icon>(EntityID.Icon, IconID.Shield01),},
            {name: 'Инвентарь', icon: '',},
            {name: 'Таверна', icon: '',},
            {name: 'Герои', icon: '',},
            {name: 'Локации', icon: '',},
            {name: 'Подземелья и рейды', icon: '',},
            {name: 'Строительство', icon: '',},
            {name: 'Крафт', icon: '',},
            {name: 'Исследования', icon: '',},
            {name: 'PvP', icon: '',},
        ];

        return this._root.render(
            <div>
                <div className={'header'}>
                    <div className={'header__site-title'}>
                        HEROES MANAGER
                    </div>
                </div>
                <div className={'container'}>
                    <LeftSidebarRC
                        items={menuItems}
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
        let itemStorage = this._container.get<GameObject>(ContainerID.StubItemStorage01);

        this._root.render(
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>
                        Хранилище
                    </div>
                    <div className={'widget__content'}>
                        <ItemStorageRC
                            size={20}
                            columns={4}
                            itemStorage={itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent)}  /* todo: Не удобно: внутри дальше планируются только интерфейсы. */
                        />
                    </div>
                </div>
            </div>
        );
    }

    private async _renderItemStorageController() {
        let itemStorageController = new ItemStorageController();
        itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20));
        itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20));
        itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20));

        itemStorageController.addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);
        itemStorageController.addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);
        itemStorageController.addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);
        itemStorageController.addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.IronOre), 12);
        itemStorageController.addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);
        itemStorageController.addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.IronOre), 12);
        itemStorageController.addItem(this._container.get<ItemDatabase>(ContainerID.ItemDatabase).get(ItemID.Wood), 12);

        this._root.render(
            <div>
                <ItemStorageControllerRC
                    itemStorageController={itemStorageController}
                />
            </div>
        );
    }

    private async _renderItemStorageControllerFromContainer() {
        let itemStorageController = this._container.get<ItemStorageControllerInterface>(ContainerID.ItemStorageController);
        itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20));
        itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20));
        itemStorageController.addItemStorage(this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20));

        await this._container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_item, [ItemID.Wood, '12']);
        await this._container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_item, [ItemID.Wood, '12']);
        await this._container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_item, [ItemID.IronOre, '42']);
        await this._container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_item, [ItemID.IronOre, '42']);
        await this._container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_item, [ItemID.IronOre, '42']);
        await this._container.get<GameConsole>(ContainerID.GameConsole).run(CommandID.create_item, [ItemID.IronOre, '300']);

        this._root.render(
            <div>
                <ItemStorageControllerRC
                    itemStorageController={itemStorageController}
                />
            </div>
        );
    }

    private devHeroList() {
        let mainHeroList = new MainHeroListComponent(5);
        mainHeroList.createHero(HeroClassID.Warrior, 1, this._container.get<HeroFactory>(ContainerID.HeroFactory));
        mainHeroList.createHero(HeroClassID.FireMage, 1, this._container.get<HeroFactory>(ContainerID.HeroFactory));
        // mainHeroList.createHero(HeroClassID.Rogue, 1, this._container.get<HeroFactory>(ContainerID.HeroFactory));
        // mainHeroList.createHero(HeroClassID.Gunslinger, 1, this._container.get<HeroFactory>(ContainerID.HeroFactory));
        // mainHeroList.createHero(HeroClassID.Priest, 1, this._container.get<HeroFactory>(ContainerID.HeroFactory));

        this._root.render(
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Главный список героев</div>
                    <div className={'widget__content'}>
                        <MainHeroListRC
                            mainHeroList={mainHeroList}
                        />
                    </div>
                </div>
            </div>
        );
    }
}