require('dotenv').config({ path: `../environments/${process.argv[3] ? process.argv[3] : 'local'}.env` });

const generateConfig = (env) => {
    const [dialect, temp] = env.split('://');
    const [credential, temp2] = temp.split('@');
    const [username, password = ''] = credential.split(':');
    const [server, database] = temp2.split('/');
    const [host, port] = server.split(':');
    return {
        username,
        password,
        database,
        port,
        host,
        dialect
    };
};

const envs = ['development', 'test', 'production'];
const configs = envs.reduce((acc, env) => {
    acc[env] = generateConfig(process.env.DB_CONNECTION_STRING);
    return acc;
}, {});

module.exports = configs;
