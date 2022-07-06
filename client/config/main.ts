import config from '../../core/config/main.js';

export default Object.assign({
    type: 'client',
    env: process.env.ENV || 'production',
}, config);