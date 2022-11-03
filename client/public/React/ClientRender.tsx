import GameConsoleRComponent from './GameConsoleRComponent.js';
import ReactDOM from 'react-dom/client';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import MainHeroListRComponent from './MainHeroListRComponent.js';
import MainHeroListComponent from '../../../core/app/Components/MainHeroListComponent.js';
import AppError from '../../../core/source/Errors/AppError.js';
import SandboxRComponent from './SandboxRComponent.js';
import MainLocationListRComponent from './MainLocationListRComponent.js';
import MainLocationListComponent from '../../../core/app/Components/MainLocationListComponent.js';
import ItemStorageControllerRComponent from './ItemStorageControllerRComponent.js';
import {ContainerID} from '../../../core/types/enums/ContainerID.js';
import ItemStorageControllerInterface from '../../../core/app/Interfaces/ItemStorageControllerInterface.js';
import {WalletRComponent} from './WalletRComponent.js';
import GameObjectStorage from '../../../core/source/GameObjectStorage.js';
import {CurrencyID} from '../../../core/types/enums/CurrencyID.js';
import {ComponentID} from '../../../core/types/enums/ComponentID.js';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface.js';
import WalletComponent from '../../../core/app/Components/WalletComponent.js';
import {Example} from './Test/Example.js';
import useCustomHook from './Test/test.js';

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
                    commandNames={this._container.get<GameConsole>(ContainerID.GameConsole).names}
                />
                <SandboxRComponent

                />
                <Example/>
            </div>
        );
    }

    private _renderGameUI(root) {
        root.render(
            <div>
                <WalletRComponent
                    container={this._container}
                    wallet={this._container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByTag('#wallet.'  + CurrencyID.Gold).get<WalletComponent>(ComponentID.Wallet)}
                />
                <WalletRComponent
                    container={this._container}
                    wallet={this._container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByTag('#wallet.'  + CurrencyID.ResearchPoints).get<WalletComponent>(ComponentID.Wallet)}
                />
                <MainHeroListRComponent
                    heroListComponent={this._container.get<MainHeroListComponent>(ContainerID.MainHeroList)}
                    container={this._container}
                />
                <MainLocationListRComponent
                    container={this._container}
                    mainLocationListComponent={this._container.get<MainLocationListComponent>(ContainerID.MainLocationList)}
                />
                <ItemStorageControllerRComponent
                    container={this._container}
                    itemStorageController={this._container.get<ItemStorageControllerInterface>(ContainerID.ItemStorageController)}
                />
            </div>
        );
    }
}