import Component from '../../source/Component.js';
import HeroClass from '../Entities/HeroClass.js';
import GameObject from '../../source/GameObject.js';
import AppError from '../../source/AppError.js';
import {PlacementControllerInterface, PlacementInterface} from './MainHeroListComponent.js';

export enum HeroState {
    Free = 'Free',
    Busy = 'Busy',  //В локации или подземелье и тд. А также если просто добавлен в группе при настроке локации.
}

export enum HeroComponentEventCode {
    ChangeState = 'heroComponent.change_state',
}

// export default class HeroComponent extends Component {
// export default class HeroComponent extends Component implements PlacementInterface<> {
//todo: Убрать. Получается, что это класс только для хранения HeroClass.
export default class HeroComponent extends Component {
    private readonly _name: string;
    private readonly _heroClass: HeroClass;
    private _state: HeroState;
    private _stateOwner;

    get name(): string {
        return this._name;
    }

    /**
     * @deprecated
     */
    get heroClass(): HeroClass {
        return this._heroClass;
    }

    //todo: Удалить.
    /**
     * @deprecated
     */
    get state(): HeroState {
        return this._state;
    }

//todo: Тут должно быть не state =, а та активность в котором занят герой. От туда же (и только от туда) героя можно освободить. Или универсальный способ. HeroStateControllerInterface - объект, который имеет право занимать героя должен реализовать интерфейс.
//     set state(value: HeroState) {
//         this._state = value;
//         this.update();
//     }

    // constructor(id: number, name: string, heroClass: HeroClass) {
    constructor(
        name: string,
        heroClass: HeroClass,
        // eventSystem: HeroClass,
    ) {
        // super(id);
        super();
        this._name = name;
        this._heroClass = heroClass;
        this._state = HeroState.Free;
        this._stateOwner = null;
    }

    isBusy(): boolean {
        return this._state !== HeroState.Free;
    }

    isFree(): boolean {
        return this._state === HeroState.Free;
    }

    //todo: Поменять на "состояние" и придумать кто может изменять статус объекта (интерфейс).
    take(stateOwner?): void {
    // place(stateOwner: PlacementControllerInterface): void {
    //     if (!this.isFree()) {
    //         throw new AppError('Герой уже занят.');
    //     }

        this._state = HeroState.Busy;
        // this._stateOwner = stateOwner;
        // this._eventSystem.event(HeroComponentEventCode.ChangeState);
    }

    release(stateOwner?): void {
    // removePlacement(stateOwner: PlacementControllerInterface): void {
    // free(stateOwner: PlacementInterface): void {
        //todo: Если не делать такой логики получается что управлять может любой объект и это превратиться в обычный сеттер. Например если ктото осободит героя пока он в локации игра будет сломана. Герой освобождается только тогда когда локация останавливается и герой удаляется из списка локации.
        // if (this._stateOwner !== stateOwner) {
        //     throw new AppError('Осовободить героя может только объект его занимавший.');
        // }

        this._state = HeroState.Free;
        // this._stateOwner = null;
    }

    canManipulate(): boolean {
        return this._state === HeroState.Free;
    }

    // delete() {
    //     //canDelete
    //     this._stateOwner = null;
    //     this._state = HeroState.Free;
    // }
}