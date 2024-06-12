import http from 'http';
import fs from 'fs/promises';

import { logNewConnection } from '../utils/log/newConnection.js';

class Server {
    #http_server: any;
    #host: string;
    #port: string;

    constructor() {
        this.#host = '';
        this.#port = '3000';
    }

    createServer = (
        callback?: (
            req: http.IncomingMessage,
            res: http.ServerResponse<http.IncomingMessage> & {
                req: http.IncomingMessage;
            }
        ) => void
    ) => {
        this.#http_server = http.createServer(async (req, res) => {
            const host = req.socket.remoteAddress;
            const port = req.socket.remotePort;
            const destinationPath = req.url;

            const requestMetadata = `${new Date().toUTCString()} - to ${destinationPath} from ${host}: ${port}\n`;

            logNewConnection(requestMetadata);

            switch (destinationPath) {
                case '/':
                    const html = await fs.readFile(
                        './public/index.html',
                        'utf8'
                    );
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(html);
                    break;
                default:
                    res.statusCode = 404;
                    res.end('Route not found');
                    break;
            }

            res.end('');
            callback && callback(req, res);
        });
    };

    serverListen = (port: string, callback: () => void) => {
        this.#setPort(port);
        this.#http_server.listen(port, callback);
    };

    getHost = () => {
        return this.#host;
    };

    #setPort = (port: string) => {
        this.#port = port;
    };

    getPort = () => {
        return this.#port;
    };
}

export default Server;
