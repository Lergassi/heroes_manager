export enum DebugNamespaceID {
    Log = 'LOG',
    Info = 'INFO',
    Error = 'ERROR',
    Warning = 'WARNING',
    Debug = 'DEBUG',
    /**
     *
     */
    // DebugLog = 'log',
    /**
     * Для вывода данных в консоль. например после загрузки EntityManager (...get(EntityManagerKey)); Для браузера и сервера логика разная. Для браузера достаточно console.log();
     */
    Dump = 'DUMP',
    // DebugAssertThrow = 'assert_throw',
    /**
     * Просто сообщение в чате как в обычных играх. todo: Кстате: в играх не так уж и много сообщений об ошибка - например скайрим: перевес, добавление предмета в сумку, обновление карты, новое задание и стадия, повышение навыка и уровня... всё...
     */
    Throw = 'THROW',
    Indev = 'INDEV',

    //core
    Http = 'HTTP',

    //game
    // GameConsole = DebugNamespaceID.Log + ':GameConsole',
    // GameConsole = _ID.Log + ':GameConsole',
    Load = 'LOAD',
    // LoadOK = 'log:load_ok',
    GameConsole = 'GAME_CONSOLE',
    EventSystem = 'EVENT_SYSTEM',
}