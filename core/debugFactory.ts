import debug from 'debug';

export enum DebugNamespaces {
    APP = 'app',
    HTTP = 'http',
}

// let a = DebugNamespaces.HTTP;

// export let debug_app = debug(DebugNamespaces.APP);
export let http = debug(DebugNamespaces.HTTP);
export default debug(DebugNamespaces.APP);

// export default debug;