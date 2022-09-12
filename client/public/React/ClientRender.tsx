import GameConsoleRComponent from './GameConsoleRComponent.js';
import ReactDOM from 'react-dom/client';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import ItemStorageRComponent, {ItemStorageCollectionRComponent} from './ItemStorageRComponent.js';
import BasicItemStorageFactory from '../../../core/app/Factories/BasicItemStorageFactory.js';
import ItemStorageComponent, {DEFAULT_ITEM_STORAGE_SIZE} from '../../../core/app/Components/ItemStorageComponent.js';
import ItemStackFactory from '../../../core/app/Factories/ItemStackFactory.js';
import {debugItemStorage} from '../../../core/debug/debug_functions.js';
import EntityManager from '../../../core/source/EntityManager.js';
import GameObjectStorage from '../../../core/source/GameObjectStorage.js';
import Span from './Span.js';
import ItemStorageListComponent from '../../../core/app/Components/ItemStorageListComponent.js';
import ItemStorageFactoryInterface from '../../../core/app/Factories/ItemStorageFactoryInterface.js';
import {HeroListRComponent, HeroRComponent} from './HeroUI.js';
import HeroListComponent from '../../../core/app/Components/HeroListComponent.js';

export default class ClientRender {
    private readonly _container: ContainerInterface;

    constructor(container: ContainerInterface) {
        this._container = container;
        window['clientRender'] = this;
        window['sandbox'] = {};
    }

    buildPreGameUI() {
        let domContainer = document.getElementById('root');
        let root = ReactDOM.createRoot(domContainer);

        this._client(root);
        // this._sandbox(root);
        // this._renderItemStorages(root);
    }

    buildGameUI() {
        let gameDomContainer = document.getElementById('game');
        let gameRoot = ReactDOM.createRoot(gameDomContainer);
        // this._renderItemStorages(gameRoot);
        // this._renderHeroes(gameRoot);
        this._renderGameUI(gameRoot);
    }

    private _client(root) {
        root.render(
            <div className={'wrapper'}>
                <GameConsoleRComponent
                    container={this._container}
                    executeUrl={'http://api.heroes.sd44.ru/game_console/execute'}
                    maxHistoryLength={100}
                    commandNames={this._container.get<GameConsole>('gameConsole').names}
                />
            </div>
        );
    }

    private _sandbox(root) {
        let itemStorage = this._container.get<ItemStorageFactoryInterface>('core.ItemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
        this._container.get<GameObjectStorage>('core.gameObjectStorage').add(itemStorage);
        itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
            this._container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 20),
        );
        itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
            this._container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 20),
        );
        itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
            this._container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_iron_ore', 20),
        );
        itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
            this._container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_one_handed_sword_01', 1),
        );
        itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
            this._container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_breastplate_01', 1),
        );
        // debugItemStorage(itemStorage);

        window['addItem'] = (alias, count = 1) => {
            itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
                this._container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias(alias, count),
            );
            debugItemStorage(itemStorage);
        };

        let itemStorageElement = <ItemStorageRComponent
            itemStorage={itemStorage}
        />;
        // console.log(itemStorageElement);
        // console.log(itemStorageElement.type());
        // itemStorageElement.type.test();
        window['clear1'] = () => {
            // debugItemStorage(this.state.itemStorage);
            itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).clear();
            // this._itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).clear();
            // debugItemStorage(this.state.itemStorage);
            // this.setState(state => ({
            //     itemStorage: state.itemStorage,
            //     // itemStorage: null,
            // }));
        };

        root.render(
            <div className={'wrapper'}>
                <GameConsoleRComponent
                    container={this._container}
                    executeUrl={'http://api.heroes.sd44.ru/game_console/execute'}
                    maxHistoryLength={100}
                    commandNames={this._container.get<GameConsole>('gameConsole').names}
                />
                {itemStorageElement}
            </div>
        );
    }

    _renderItemStorages(root) {
        root.render(
            <ItemStorageCollectionRComponent
                itemStorageCollection={this._container.get<ItemStorageListComponent>('player.itemStorageCollection')}
            />
        );
    }

    update() {

    }

    _renderHeroes(root) {
        root.render(
            <HeroListRComponent
                heroListComponent={this._container.get<HeroListComponent>('player.heroesListComponent')}
                itemStorageCollection={this._container.get<ItemStorageListComponent>('player.itemStorageCollection')}
                container={this._container}
            />
        );
    }

    _renderGameUI(root) {
        root.render(
            <div>
                <HeroListRComponent
                    heroListComponent={this._container.get<HeroListComponent>('player.heroesListComponent')}
                    itemStorageCollection={this._container.get<ItemStorageListComponent>('player.itemStorageCollection')}
                    container={this._container}
                />
                <ItemStorageCollectionRComponent
                    itemStorageCollection={this._container.get<ItemStorageListComponent>('player.itemStorageCollection')}
                />
                {/*<HeroRComponent*/}
                {/*    hero={null}*/}
                {/*    container={this._container}*/}
                {/*/>*/}
            </div>
        );
    }
}