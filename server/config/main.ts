import config from '../../core/config/main.js';
import path from 'path';

export default Object.assign({
    type: 'server',
    env: process.env.ENV || 'production',
    /**
     * Пока это путь до проекта, а не сервера.
     * Учитывать, что process.cwd() вернет директорию запуска node, а не расположения server/index.js.
     */
    projectDir: process.env.PROJECT_DIR || process.cwd(),

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
}, config);