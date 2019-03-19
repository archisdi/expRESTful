require('dotenv').config({ path: `./environments/${process.argv[2] ? process.argv[2] : 'local'}.env` });

const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);
const port = parseInt(process.env.APP_PORT, 10) || 3000;

const onError = (error) => {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (error.code) {
    case 'EACCES':
        console.error(`${bind} requires elevated privileges`); // eslint-disable-line
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`); // eslint-disable-line
        process.exit(1);
        break;
    default:
        throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);  // eslint-disable-line
};

app.set('port', port);

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
