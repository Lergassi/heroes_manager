export enum DebugNamespaceID {
    Log = 'log',
    Info = 'info',
    Error = 'error',
    Warring = 'warring',
    Debug = 'debug',

    //core
    Http = 'http',

    //game
    // GameConsole = DebugNamespaceID.Log + ':GameConsole',
    // GameConsole = _ID.Log + ':GameConsole',
    Load = 'log:load',
    LoadOK = 'log:load_ok',
    GameConsole = 'log:game_console',
    EventSystem = 'log:event_system',
}