import http from 'http';

class Server {
    #http_server: any;
    #host: string;
    #port: string;

    constructor() {
        this.#host = '';
        this.#port = '3000';
    }

    createServer = (
        callback: (
            req: http.IncomingMessage,
            res: http.ServerResponse<http.IncomingMessage> & {
                req: http.IncomingMessage;
            }
        ) => void
    ) => {
        this.#http_server = http.createServer(callback);
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
