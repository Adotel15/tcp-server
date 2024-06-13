import fs from 'fs/promises';
import dotenv from 'dotenv';

import Server from './lib/server.js';

import { logNewConnection } from './utils/log/newConnection.js';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

const appServer = new Server();

appServer.createServer((req, res) => {
    logNewConnection(
        req.socket.remoteAddress ?? 'no-remote-host',
        req.socket.remotePort ?? 0,
        req.url ?? 'no-destination-path'
    );
});

appServer.route('/', async (_, res) => {
    const html = await fs.readFile('./public/index.html', 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    return res.end(html);
});

appServer.serverListen(SERVER_PORT, () => {
    console.log('Server listening on port ' + SERVER_PORT);
});
