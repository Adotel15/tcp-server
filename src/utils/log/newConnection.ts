import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

// TODO: Create log system
const logNewConnection = async (
    remoteAddress: string,
    remotePort: number,
    destinationPath: string
) => {
    try {
        await fs.appendFile(
            process.env.CONNECTION_LOGS_PATH,
            `${new Date().toUTCString()} - PATH: ${destinationPath} FROM ${remoteAddress}: ${remotePort}\n`
        );
    } catch (error) {
        console.log(error);
    }
};

export { logNewConnection };
