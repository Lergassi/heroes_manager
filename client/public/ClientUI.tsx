import GameConsoleRComponent from './_React/GameConsoleRComponent.js';
import ReactDOM from 'react-dom/client';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import GameConsole from '../../core/source/GameConsole/GameConsole.js';
import MainHeroListRComponent from './_React/MainHeroListRComponent.js';
import MainHeroListComponent from '../../core/app/Components/MainHeroListComponent.js';
import AppError from '../../core/source/Errors/AppError.js';
import SandboxRComponent from './_React/SandboxRComponent.js';
import MainLocationListRComponent from './_React/MainLocationListRComponent.js';
import MainLocationListComponent from '../../core/app/Components/MainLocationListComponent.js';
import ItemStorageControllerRComponent from './_React/ItemStorageControllerRComponent.js';
import {ContainerID} from '../../core/types/enums/ContainerID.js';
import ItemStorageControllerInterface from '../../core/app/Interfaces/ItemStorageControllerInterface.js';
import {WalletRComponent} from './_React/WalletRComponent.js';
import GameObjectStorage from '../../core/source/GameObjectStorage.js';
import {CurrencyID} from '../../core/types/enums/CurrencyID.js';
import {ComponentID} from '../../core/types/enums/ComponentID.js';
import WalletInterface from '../../core/app/Interfaces/WalletInterface.js';
import Wallet from '../../core/app/Components/Wallet.js';
import {Example} from './_React/Test/Example.js';
import useCustomHook from './_React/Test/test.js';
import PlayerItemStorage from './_React/PlayerItemStorage.js';
import WalletRC2 from './_React/WalletRC2.js';
import Currency from '../../core/app/Entities/Currency.js';
import ItemStorageRC from './Components/ItemStorageRC.js';
import ItemStorageControllerRC from './Components/ItemStorageControllerRC.js';
import MainHeroListRC from './Components/MainHeroListRC.js';

export default class ClientUI {
    private readonly _container: ContainerInterface;

    constructor(container: ContainerInterface) {
        this._container = container;

        //@dev
        window['_container'] = this._container;
        window['_clientRender'] = this;
        window['_sandbox'] = {};
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
        let wallets = {
            player: new Wallet(0),
            npc: new Wallet(100),
            location: new Wallet(200),
        };
        // console.log('wallets', wallets);
        window['_wallets'] = wallets;

        root.render(
            <div className={'wrapper'}>
                <GameConsoleRComponent
                    container={this._container}
                    executeUrl={'http://api.heroes.sd44.ru/game_console/execute'}
                    maxHistoryLength={100}
                    commandNames={this._container.get<GameConsole>(ContainerID.GameConsole).names}
                />
                {/*<SandboxRComponent*/}

                {/*/>*/}
                {/*<Example/>*/}
                {/*<WalletRC2*/}

                {/*/>*/}
            </div>
        );
    }

    private _renderGameUI(root) {
        root.render(
            <div>
                <WalletRComponent
                    // container={this._container}
                    // wallet={this._container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByTag('#wallet.'  + CurrencyID.Gold).get<WalletComponent>(ComponentID.Wallet)}
                />
                {/*<WalletRComponent*/}
                {/*    container={this._container}*/}
                {/*    wallet={this._container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByTag('#wallet.'  + CurrencyID.Gold).get<WalletComponent>(ComponentID.Wallet)}*/}
                {/*/>*/}
                {/*<WalletRComponent*/}
                {/*    container={this._container}*/}
                {/*    wallet={this._container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByTag('#wallet.'  + CurrencyID.ResearchPoints).get<WalletComponent>(ComponentID.Wallet)}*/}
                {/*/>*/}
                {/*<MainHeroListRComponent*/}
                {/*    heroListComponent={this._container.get<MainHeroListComponent>(ContainerID.MainHeroList)}*/}
                {/*    container={this._container}*/}
                {/*/>*/}
                <div className={'widget'}>
                    <div className={'widget__title'}>Герои</div>
                    <div className={'widget__content'}>
                        <MainHeroListRC
                            mainHeroList={this._container.get<MainHeroListComponent>(ContainerID.MainHeroList)}
                        />
                    </div>
                </div>
                <MainLocationListRComponent
                    container={this._container}
                    mainLocationListComponent={this._container.get<MainLocationListComponent>(ContainerID.MainLocationList)}
                />
                <ItemStorageControllerRC
                    itemStorageController={this._container.get<ItemStorageControllerInterface>(ContainerID.ItemStorageController)}
                />
            </div>
        );
    }
}