import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) {
            await fsPromises.mkdir(logDir);
        }
        await fsPromises.appendFile(path.join(logDir, logFileName), logItem);
    } catch (err) {
        console.log(err);
    }
};

export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
};
