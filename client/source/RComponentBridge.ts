/**
 * Интерфейс для React компонентов.
 */
export interface RComponentUpdateInterface {
    update(target): void;
    // assignRComponent(rComponent): void;
}

/**
 * Интерфейс для объектов, которые привязываются к UI.
 */
export interface AssignRComponentInterface {
    assignRComponent(rComponent): void;
    removeRComponent(rComponent): void;
    update(): void;
}

export default class RComponentBridge {
    private _rComponent: RComponentUpdateInterface;

    set rComponent(value) {
        this._rComponent = value;
    }

    get rComponent(): RComponentUpdateInterface {
        return this._rComponent;
    }

    constructor(rComponent = null) {
        this._rComponent = rComponent;
    }

    update(target): void {
        if (this._rComponent) {
            this._rComponent.update(target);
        }
    }
}