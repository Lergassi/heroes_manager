import path from 'path';

export default {
    env: process.env.ENV || 'production',
    /**
     * Пока это путь до проекта, а не сервера.
     * Учитывать, что process.cwd() вернет директорию запуска node, а не расположения server/index.js.
     */
    projectDir: process.env.PROJECT_DIR || process.cwd(),
    /**
     * Все пути кроме projectDir должны быть относительные.
     */
    dataDir: 'server/data',
    savesDir: 'saves',

    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 80,

    //todo: Пока тут.
    services: {
        router: {
            controllerDir: path.resolve(process.env.PROJECT_DIR, 'server/app/Controllers'),
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