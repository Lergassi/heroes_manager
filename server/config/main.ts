import path from 'path';

export default {
    env: process.env.ENV || 'production',
    /**
     * Пока это путь до проекта, а не сервера.
     * Учитывать, что process.cwd() вернет директорию запуска node (корневая директория), а не расположения server/index.js.
     */
    projectDir: process.env.PROJECT_DIR || process.cwd(),
    // coreDir: '#projectDir#/core',
    // serverDir: '#projectDir#/server',
    // coreDataDir: '#projectDir#/data',
    // serverDataDir: '#serverDir#/data',
    // serverSaveDir: '#serverDataDir#/saves',

    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 80,

    //todo: Это должно идти после config в другом месте.
    services: {
        router: {
            controllerDir: path.resolve(process.env.PROJECT_DIR || process.cwd(), 'server/app/Controllers'),
        },
        database: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            name: process.env.DB_NAME,
            pool: {
                connectionLimit: 10,
            },
        },
    },
};