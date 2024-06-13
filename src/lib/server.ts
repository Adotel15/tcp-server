import http from 'http';

type serverCallback = (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    }
) => void;

type httpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

class Server {
    host: string;
    port: string;
    httpServer: any;
    routes: {
        path: string;
        method: httpMethods;
        controller: serverCallback;
    }[];

    constructor() {
        this.host = '';
        this.port = '3000';
        this.routes = [];
    }

    createServer = (callback?: serverCallback) => {
        this.httpServer = http.createServer(async (req, res) => {
            const findIndex = this.routes.findIndex(
                (route) => route.path === req.url && route.method === req.method
            );

            if (findIndex === -1) {
                res.statusCode = 404;
                return res.end('Route not found');
            }

            this.routes[findIndex]!.controller(req, res);

            callback && callback(req, res);
        });
    };

    route = (
        method: httpMethods,
        route: string,
        callbackController: serverCallback
    ) => {
        this.routes = [
            ...this.routes,
            { path: route, method: method, controller: callbackController },
        ].sort((a, b) => {
            if (a.path > b.path) return 1;
            else if (a.path === b.path) return 0;
            else return -1;
        });
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
