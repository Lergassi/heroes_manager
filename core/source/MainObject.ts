export default abstract class MainObject {
    get toStringObject(): object {
        return {
            className: this.constructor.name,
        };
    }

    get debugObject(): object {
        return {
            className: this.constructor.name,
        }
    }

    debug(objectDebugger) {
        // debug('debug')(this.toString());
        objectDebugger['classname'] = this.constructor.name;
    }

    toString() {
        return JSON.stringify(this.toStringObject);
    }

    // debugInterface(objectDebugger) {
    //         objectDebugger['classname'] = this.constructor.name;
    // }
}