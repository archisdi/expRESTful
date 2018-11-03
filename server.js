require('dotenv').config();

const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = parseInt(process.env.APP_PORT, 10) || 3000;

const onError = (error) => {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (error.code) {
    case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
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
    console.log(`Listening on ${bind}`);
};

app.set('port', port);

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
