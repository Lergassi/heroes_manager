export type ListenerType = Readonly<{
    // code: string;
    callback: (target) => void;
}>

export default class EventSystem {
    private readonly _listeners: {[code: string]: ListenerType[]};

    constructor() {
        this._listeners = {};
    }

    addListener(codes: string | string[], listener: ListenerType): void {
        if (typeof codes === 'string') {
            codes = [codes];
        }

        for (let i = 0; i < codes.length; i++) {
            if (!this._listeners.hasOwnProperty(codes[i])) {
                this._listeners[codes[i]] = [];
            }

            this._listeners[codes[i]].push(listener);
        }
    }

    event<T>(code: string, target: T): void {
        if (!this._listeners.hasOwnProperty(code)) {
            return;
        }

        for (let i = 0; i < this._listeners[code].length; i++) {
            this._listeners[code][i].callback(target);
        }
    }
}