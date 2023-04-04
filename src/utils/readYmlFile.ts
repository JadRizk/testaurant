import { parse } from 'yaml';
import { readFile } from './readFile';

export const readYamlFile = (path: string) => {
    const content = readFile(path);
    return parse(content);
};
