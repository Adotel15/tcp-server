import http from 'http';

import { logNewConnection } from '../utils/log/newConnection.js';

class Server {
    host: string;
    port: string;
    httpServer: any;
    routes: {
        path: string;
        controller: (
            req: http.IncomingMessage,
            res: http.ServerResponse<http.IncomingMessage> & {
                req: http.IncomingMessage;
            }
        ) => void;
    }[];

    constructor() {
        this.host = '';
        this.port = '3000';
        this.routes = [];
    }

    createServer = (
        callback?: (
            req: http.IncomingMessage,
            res: http.ServerResponse<http.IncomingMessage> & {
                req: http.IncomingMessage;
            }
        ) => void
    ) => {
        this.httpServer = http.createServer(async (req, res) => {
            const host = req.socket.remoteAddress;
            const port = req.socket.remotePort;
            const destinationPath = req.url;

            const requestMetadata = `${new Date().toUTCString()} - to ${destinationPath} from ${host}: ${port}\n`;

            logNewConnection(requestMetadata);

            const findIndex = this.routes.findIndex(
                (item) => item.path === destinationPath
            );

            if (findIndex === -1) {
                res.statusCode = 404;
                res.end('Route not found');
            }

            this.routes[findIndex]?.controller(req, res);
            callback && callback(req, res);
        });
    };

    route = (
        route: string,
        callbackController: (
            req: http.IncomingMessage,
            res: http.ServerResponse<http.IncomingMessage> & {
                req: http.IncomingMessage;
            }
        ) => void
    ) => {
        this.routes = [
            ...this.routes,
            { path: route, controller: callbackController },
        ];
    };

    serverListen = (port: string, callback: () => void) => {
        this.setPort(port);
        this.httpServer.listen(port, callback);
    };

    getHost = () => {
        return this.host;
    };

    setHost = (host: string) => {
        this.host = host;
    };

    getPort = () => {
        return this.port;
    };

    setPort = (port: string) => {
        this.port = port;
    };
}

export default Server;
