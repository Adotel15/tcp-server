import { randomUUID, type UUID } from 'crypto';

import type { serverCallback } from './server.js';

class Route {
    uid: UUID;

    constructor() {
        this.uid = randomUUID();
    }

    // Extends
    get = (path: string, callback: serverCallback) => {};

    post = (path: string, callback: serverCallback) => {};

    put = (path: string, callback: serverCallback) => {};

    delete = (path: string, callback: serverCallback) => {};
}

export default Route;
