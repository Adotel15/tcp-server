import http from 'http';

import Route from './route.js';

export type serverCallback = (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    }
) => void;

type httpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

class Server {
    public host: string;
    public port: string;
    public httpServer: any;
    public routes: {
        path: string;
        method: httpMethods;
        controller: serverCallback;
    }[];
    public newRoutes: any;

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

    newRoute = () => {
        /**
         * When this function is called, it should return a new route instance to configure.
         * We need a way to register the route into the server, and then have the capcity to get to that route
         * instance, when incoming request reaches server
         */
        return new Route();
    };

    use = (route: Route) => {
        /** TODO: how to implement the route to the server   */
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
