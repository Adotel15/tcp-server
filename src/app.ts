import dotenv from 'dotenv';

import Server from './lib/server.js';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

const appServer = new Server();

appServer.createServer();

appServer.serverListen(SERVER_PORT, () => {
    console.log('Server listening on port ' + SERVER_PORT);
});
