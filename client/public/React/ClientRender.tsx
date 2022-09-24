import GameConsoleRComponent from './GameConsoleRComponent.js';
import ReactDOM from 'react-dom/client';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import ItemStorageUI, {ItemStorageCollectionRComponent} from './ItemStorageUI.js';
import ItemStorageFactory from '../../../core/app/Factories/ItemStorageFactory.js';
import ItemStorageComponent, {DEFAULT_ITEM_STORAGE_SIZE} from '../../../core/app/Components/ItemStorageComponent.js';
import ItemStackFactory from '../../../core/app/Factories/ItemStackFactory.js';
import {debugItemStorage} from '../../../core/debug/debug_functions.js';
import EntityManager from '../../../core/source/EntityManager.js';
import GameObjectStorage from '../../../core/source/GameObjectStorage.js';
import ItemStorageListComponent from '../../../core/app/Components/ItemStorageListComponent.js';
import ItemStorageFactoryInterface from '../../../core/app/Factories/ItemStorageFactoryInterface.js';
import {HeroListRComponent, HeroRComponent} from './HeroUI.js';
import HeroListComponent from '../../../core/app/Components/HeroListComponent.js';
import {LocationRComponent} from './LocationRComponent.js';
import AppError from '../../../core/source/AppError.js';
import SandboxRComponent from './SandboxRComponent.js';

export default class ClientRender {
    private readonly _container: ContainerInterface;

    constructor(container: ContainerInterface) {
        this._container = container;

        //@dev
        window['container'] = this._container;
        window['clientRender'] = this;
        window['sandbox'] = {};
    }

    buildPreGameUI() {
        let domContainer = document.getElementById('root');
        if (!domContainer) {
            throw AppError.rootElementNotFound()
        }

        let preGameRoot = ReactDOM.createRoot(domContainer);
        this._renderPreGameUI(preGameRoot);
    }

    buildGameUI() {
        let gameDomContainer = document.getElementById('game');
        if (!gameDomContainer) {
            throw AppError.rootElementNotFound()
        }

        let gameRoot = ReactDOM.createRoot(gameDomContainer);
        this._renderGameUI(gameRoot);
    }

    private _renderPreGameUI(root) {
        root.render(
            <div className={'wrapper'}>
                <GameConsoleRComponent
                    container={this._container}
                    executeUrl={'http://api.heroes.sd44.ru/game_console/execute'}
                    maxHistoryLength={100}
                    commandNames={this._container.get<GameConsole>('gameConsole').names}
                />
                <SandboxRComponent

                />
            </div>
        );
    }

    private _renderGameUI(root) {
        root.render(
            <div>
                <HeroListRComponent
                    heroListComponent={this._container.get<HeroListComponent>('player.heroesListComponent')}
                    itemStorageCollection={this._container.get<ItemStorageListComponent>('player.itemStorageCollection')}
                    container={this._container}
                />
                <LocationRComponent
                    locationComponent={window['gameLocation']}
                />
                <ItemStorageCollectionRComponent
                    itemStorageCollection={this._container.get<ItemStorageListComponent>('player.itemStorageCollection')}
                />
            </div>
        );
    }
}