import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

const logNewConnection = async (host: string) => {
    try {
        await fs.appendFile(process.env.CONNECTION_LOGS_PATH, host);
    } catch (error) {
        console.log(error);
    }
};

export { logNewConnection };
