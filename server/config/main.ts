import config from '../../core/config/main.js';

export default Object.assign(config, {
    env: process.env.APP_ENV || 'production',
    projectDir: process.env.APP_PROJECT_DIR || process.cwd(),   //Учитывать, что process.cwd() вернет директорию запуска node, а не расположения server/index.js.
    host: 'heroes.sd44.ru',
    port: 8000,

    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE,
});