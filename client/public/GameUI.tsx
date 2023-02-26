import {UNDEFINED_INJECT_ANNOTATION} from 'inversify/lib/constants/error_msgs.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Experience from '../../core/app/Components/Experience.js';
import HeroComponent from '../../core/app/Components/HeroComponent.js';
import ItemStorageController from '../../core/app/Components/ItemStorageController.js';
import MainHeroList from '../../core/app/Components/MainHeroList.js';
import MainLocationList from '../../core/app/Components/MainLocationList.js';
import ItemStorageInterface from '../../core/app/Interfaces/ItemStorageInterface.js';
import WalletInterface from '../../core/app/Interfaces/WalletInterface.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import AppError from '../../core/source/Errors/AppError.js';
import GameConsole from '../../core/source/GameConsole/GameConsole.js';
import {ComponentID} from '../../core/types/enums/ComponentID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import {UI_ShortHero} from '../../core/types/main.js';
import UIUpdater from '../app/UIUpdater.js';
import GameConsoleRC from './_React/GameConsoleRC.js';
import DetailHeroRC from './RComponents/DetailHeroRC.js';
import DetailLocationRC from './RComponents/DetailLocationRC.js';
import EquipItemListRC from './RComponents/EquipItemListRC.js';
import GameRC from './RComponents/GameRC.js';
import ItemStorageControllerRC from './RComponents/ItemStorageControllerRC.js';
import LeftSidebarRC from './RComponents/LeftSidebarRC.js';
import MainHeroListRC from './RComponents/MainHeroListRC.js';
import MainLocationListRC from './RComponents/MainLocationListRC.js';
import WalletRC from './RComponents/WalletRC.js';

export default class GameUI {
    private readonly _container: ContainerInterface;

    constructor(container: ContainerInterface) {
        this._container = container;

        //@dev
        window['app'] = {};
        window['app']['container'] = this._container;
        // window['app']['clientRender'] = this;
        window['app']['sandbox'] = {};
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

        this._container.get<UIUpdater>(ServiceID.UI_Updater).run();
    }

    private _renderPreGameUI(root) {
        root.render(
            <div className={'wrapper'}>
                <GameConsoleRC
                    container={this._container}
                    executeUrl={'http://api.heroes.sd44.ru/game_console/execute'}
                    commandNames={this._container.get<GameConsole>(ServiceID.GameConsole).names}
                />
            </div>
        );
    }

    private _renderGameUI(root) {
        root.render(
            // <div>
            //     <MainHeroListRC
            //         container={this._container}
            //         mainHeroList={this._container.get<MainHeroList>(ServiceID.MainHeroList)}
            //     />
            //     <DetailHeroRC
            //         container={this._container}
            //         itemStorage={this._container.get<ItemStorageInterface>(ServiceID.ItemStorageController)}
            //     />
            //     <MainLocationListRC
            //         container={this._container}
            //         mainLocationList={this._container.get<MainLocationList>(ServiceID.MainLocationList)}
            //     />
            //     <DetailLocationRC
            //         container={this._container}
            //         mainHeroList={this._container.get<MainHeroList>(ServiceID.MainHeroList)}
            //     />
            //     <WalletRC
            //         container={this._container}
            //         wallet={this._container.get<WalletInterface>(ServiceID.Wallet)}
            //     />
            //     <ItemStorageControllerRC
            //         container={this._container}
            //         itemStorageController={this._container.get<ItemStorageController>(ServiceID.ItemStorageController)}
            //     />
            // </div>
            <GameRC
                container={this._container}
            />
        );
    }
}