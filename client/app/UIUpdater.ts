import _ from 'lodash';
import debug from 'debug';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import DetailHeroRC from '../public/Components/DetailHeroRC.js';
import DetailLocationRC from '../public/Components/DetailLocationRC.js';
import ItemStorageControllerRC from '../public/Components/ItemStorageControllerRC.js';
import ItemStorageRC from '../public/Components/ItemStorageRC.js';
import MainHeroListRC from '../public/Components/MainHeroListRC.js';
import MainLocationListRC from '../public/Components/MainLocationListRC.js';
import WalletRC from '../public/Components/WalletRC.js';

enum UIState {
    Stop = 'Stop',
    Run = 'Run',
}

export default class UIUpdater {
    private _state: UIState;

    private readonly _container: ContainerInterface;
    private readonly _updateIntervalDelay: number = 100;
    private _updateUIIntervalID: NodeJS.Timer;

    private readonly _elements;

    constructor(container: ContainerInterface) {
        this._container = container;
        this._state = UIState.Stop;
        this._elements = [];
    }

    run(): void {
        if (this._state !== UIState.Stop) return;

        this._updateUIIntervalID = setInterval(() => {
            //todo: Сделать отдельный класс для добавление/удаления компоненток для обновления.
            // this._container.get<WalletRC>(ServiceID.UI_Wallet)?.updateByRequest();
            // this._container.get<ItemStorageControllerRC>(ServiceID.UI_ItemStorageController)?.updateByRequest();
            // this._container.get<ItemStorageRC>(ServiceID.UI_ItemStorage + '.0')?.updateByRequest();
            // this._container.get<ItemStorageRC>(ServiceID.UI_ItemStorage + '.1')?.updateByRequest();
            // this._container.get<ItemStorageRC>(ServiceID.UI_ItemStorage + '.2')?.updateByRequest();
            // this._container.get<MainHeroListRC>(ServiceID.UI_MainHeroList)?.updateByRequest();
            // this._container.get<DetailHeroRC>(ServiceID.UI_DetailHero)?.updateByRequest();
            // this._container.get<MainLocationListRC>(ServiceID.UI_MainLocationList)?.updateByRequest();
            // this._container.get<DetailLocationRC>(ServiceID.UI_DetailLocation)?.updateByRequest();
            for (let i = 0; i < this._elements.length; i++) {
                this._elements[i]?.updateByRequest();
            }
        }, this._updateIntervalDelay)

        this._state = UIState.Run;
        debug(DebugNamespaceID.Log)('UIUpdater запущен.');
    }

    stop(): void {
        if (this._state !== UIState.Run) return;

        clearInterval(this._updateUIIntervalID);

        this._state = UIState.Run;
    }

    /**
     * Последовательность не важна, ID не нужны. Только для обновления данных из объектов.
     * @param element
     */
    add(element): void {
        if (!_.includes(this._elements, element)) {
            this._elements.push(element);
        }
    }
}