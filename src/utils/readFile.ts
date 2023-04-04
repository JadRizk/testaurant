import fs from 'fs';

export const readFile = (path: string) => {
    try {
        return fs.readFileSync(path, 'utf-8');
    } catch (err) {
        console.error(`Error reading file: ${err}`);
        return '';
    }
};
