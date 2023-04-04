import fs from 'fs';
import { successLog } from '../console-logger';

const createFileIfNotExists = (filePath: string) => {
    try {
        fs.accessSync(filePath);
    } catch (error) {
        fs.writeFileSync(filePath, '');
    }
};

export const writeToFile = (path: string, content: string) => {
    try {
        createFileIfNotExists(path);
        fs.writeFileSync(path, content);
        successLog(`Successfully wrote to file: ${path}`);
    } catch (err) {
        console.error(`Error writing to file: ${err}`);
    }
};
