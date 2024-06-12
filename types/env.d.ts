// env.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
        SERVER_PORT: string;
        CONNECTION_LOGS_PATH: string;
    }
}
