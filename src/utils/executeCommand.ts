import { type IExample } from './getCommandOptions';
import path from 'path';
import { readYamlFile } from './readYmlFile';
import fs from 'fs';
import { testGenerator } from '../testGenerator';
import { type IModel } from './getCompletionRequest';
import { infoLog } from '../console-logger';

export const CONFIG_FILE_NAME = 'examples.config.yml';

export type IConfig = Record<
    string,
    {
        techs: string[];
        tips: string[];
        examples: IExample[];
    }
>;

export interface ICommandArgs {
    inputFile: string;
    outputFile: string;
    apiKey: string;
    model: IModel;
    techs?: string;
    tips?: string;
    examples?: IExample[];
    config?: string;
}

export const readConfig = (configFilePath: string): IConfig => {
    if (fs.existsSync(configFilePath)) {
        infoLog(`Reading ${CONFIG_FILE_NAME}...`);
        return readYamlFile(configFilePath);
    } else {
        infoLog(`Config file not found, continuing with default config`);
        return {};
    }
};

export const executeCommand = async ({
    inputFile,
    outputFile,
    apiKey,
    model,
    examples,
}: ICommandArgs): Promise<void> => {
    // Get the file extension of the input file
    const inputFileExtension = path.extname(inputFile);

    // Read the configuration file
    const configFilePath = path.join(process.cwd(), CONFIG_FILE_NAME);
    const testaurantConfig = readConfig(configFilePath);

    // Get the command line arguments and the parsed configuration
    const parsedTechs = testaurantConfig?.[inputFileExtension]?.techs ?? [];
    const parsedTips = testaurantConfig?.[inputFileExtension]?.tips ?? [];

    await testGenerator({
        inputFile,
        outputFile,
        apiKey,
        model,
        examples,
        techs: parsedTechs,
        tips: parsedTips,
    });
};
