import GameConsoleRComponent from './GameConsoleRComponent.js';
import ReactDOM from 'react-dom/client';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import MainItemStorageListComponent from '../../../core/app/Components/MainItemStorageListComponent.js';
import MainHeroListRComponent from './MainHeroListRComponent.js';
import MainHeroListComponent from '../../../core/app/Components/MainHeroListComponent.js';
import AppError from '../../../core/source/Errors/AppError.js';
import SandboxRComponent from './SandboxRComponent.js';
import MainLocationListRComponent from './MainLocationListRComponent.js';
import MainLocationListComponent from '../../../core/app/Components/MainLocationListComponent.js';
import MainItemStorageListRComponent from './MainItemStorageListRComponent.js';
import {ContainerKey} from '../../../core/types/enums/ContainerKey.js';

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
                <MainHeroListRComponent
                    heroListComponent={this._container.get<MainHeroListComponent>('player.heroesListComponent')}
                    container={this._container}
                />
                <MainLocationListRComponent
                    container={this._container}
                    mainLocationListComponent={this._container.get<MainLocationListComponent>(ContainerKey.MainLocationListComponent)}
                />
                <MainItemStorageListRComponent
                    itemStorageCollection={this._container.get<MainItemStorageListComponent>('player.itemStorageCollection')}
                />
            </div>
        );
    }
}