import fs from 'fs/promises';
import dotenv from 'dotenv';

import Server from './lib/server.js';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

const logNewConnection = async (host: string) => {
    try {
        await fs.appendFile(process.env.CONNECTION_LOGS_PATH, host);
    } catch (error) {
        console.log(error);
    }
};

const appServer = new Server();

appServer.createServer(async (req, res) => {
    const host = req.socket.remoteAddress;
    const port = req.socket.remotePort;
    const destinationPath = req.url;

    const requestMetadata = `${new Date().toUTCString()} - to ${destinationPath} from ${host}: ${port}\n`;

    logNewConnection(requestMetadata);

    switch (destinationPath) {
        case '/':
            const html = await fs.readFile('./public/index.html', 'utf8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            break;
        default:
            res.statusCode = 404;
            res.end('Route not found');
            break;
    }

    return res.end('');
});

appServer.serverListen(SERVER_PORT, () => {
    console.log('Server listening on port ' + SERVER_PORT);
});
