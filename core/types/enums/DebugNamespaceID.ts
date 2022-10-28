export enum DebugNamespaceID {
    Log = 'log',
    Info = 'info',
    Error = 'error',
    Warning = 'warning',
    Debug = 'debug',

    //core
    Http = 'http',

    //game
    // GameConsole = DebugNamespaceID.Log + ':GameConsole',
    // GameConsole = _ID.Log + ':GameConsole',
    Load = 'log:load',
    LoadDebug = 'log:load_debug',   //Для вывода данных в консоль. например после загрузки EntityManager (...get(EntityManagerKey));
    LoadOK = 'log:load_ok',
    GameConsole = 'log:game_console',
    EventSystem = 'log:event_system',
}