export enum DebugNamespaceID {
    Log = 'log',
    Info = 'info',
    Error = 'error',
    Warning = 'warning',
    Debug = 'debug',
    /**
     *
     */
    DebugLog = 'debug:log',
    /**
     * Для вывода данных в консоль. например после загрузки EntityManager (...get(EntityManagerKey)); Для браузера и сервера логика разная. Для браузера достаточно console.log();
     */
    DebugDump = 'debug:dump',
    DebugAssertThrow = 'debug:assert_throw',
    /**
     * Просто сообщение в чате как в обычных играх. todo: Кстате: в играх не так уж и много сообщений об ошибка - например скайрим: перевес, добавление предмета в сумку, обновление карты, новое задание и стадия, повышение навыка и уровня... всё...
     */
    Throw = 'throw',
    Indev = 'debug:indev',

    //core
    Http = 'http',

    //game
    // GameConsole = DebugNamespaceID.Log + ':GameConsole',
    // GameConsole = _ID.Log + ':GameConsole',
    Load = 'log:load',
    // LoadOK = 'log:load_ok',
    GameConsole = 'log:game_console',
    EventSystem = 'log:event_system',
}