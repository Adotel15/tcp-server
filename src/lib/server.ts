import http from 'http';

type serverCallbackType = (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    }
) => void;

class Server {
    host: string;
    port: string;
    httpServer: any;
    routes: {
        path: string;
        controller: serverCallbackType;
    }[];

    constructor() {
        this.host = '';
        this.port = '3000';
        this.routes = [];
    }

    createServer = (callback?: serverCallbackType) => {
        this.httpServer = http.createServer(async (req, res) => {
            const findIndex = this.routes.findIndex(
                (item) => item.path === req.url
            );

            if (findIndex === -1) {
                res.statusCode = 404;
                return res.end('Route not found');
            }

            this.routes[findIndex]!.controller(req, res);

            callback && callback(req, res);
        });
    };

    route = (route: string, callbackController: serverCallbackType) => {
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
