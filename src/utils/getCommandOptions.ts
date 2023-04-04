import { program } from 'commander';
import { type ICommandArgs } from './executeCommand';
import path from 'path';
import { errorLog, infoLog, successLog, warnLog } from '../console-logger';

export interface IExample {
    fileName: string;
    code: string;
    tests: string;
}

export const DEFAULT_MODEL = 'gpt-3.5-turbo';

export type ICommandOptions = ICommandArgs & { help: boolean };

export const getCommandOptions = (): ICommandArgs => {
    // Define the options for the command
    program
        .option(
            '-i, --inputFile <char>',
            'The input file to generate tests for'
        )
        .option(
            '-o, --outputFile <char>',
            'The output file to write the generated tests to'
        )
        .option(
            '-k, --apiKey <char>',
            'The OpenAI API key to use for generating tests'
        )
        .option(
            '-m, --model <char>',
            'The OpenAI model to use for generating tests'
        )
        .option('-t, --techs <char>', 'The technologies used in the input file')
        .option(
            '-p, --tips <char>',
            'The testing tips to use for generating tests'
        )
        .option(
            '-c, --config <char>',
            'The configuration file to use for generating tests'
        )
        .option('-h, --help', 'Print this help message');

    // Parse the options
    program.parse();

    // Get the options
    const options: ICommandOptions = program.opts();

    // If the help option is present, print the help message and exit the program
    if (options.help) {
        infoLog(
            'Usage: testaurant -i <inputFile> [-o <outputFile>] -k <apiKey> [-m <model>] [-t <techs>] [-p <tips>] [-c <config>]'
        );

        successLog(
            '\nAll fields are optional except for the input file and API key. If no output file is provided, the default will be used.'
        );

        process.exit(0);
    }

    // Check if the required options are present
    if (!options.inputFile || !options.apiKey) {
        errorLog('Error: The input file and API key options are required.');
        process.exit(1);
    }

    const getOutputFile = (): string => {
        if (options.outputFile) {
            return options.outputFile;
        }

        // Get the file extension of the input file
        const inputFileExtension = path.extname(options.inputFile);

        const inputFileWithoutExtension = options.inputFile.replace(
            inputFileExtension,
            ''
        );
        const newOutputFile = `${inputFileWithoutExtension}.test${inputFileExtension}`;

        infoLog('No output file provided, using default.');
        warnLog(`Output file: ${options.inputFile}`);

        return newOutputFile;
    };

    // Provide default values for missing options
    return {
        inputFile: options.inputFile,
        outputFile: options.outputFile ?? getOutputFile(),
        apiKey: options.apiKey,
        model: options.model ?? DEFAULT_MODEL,
        techs: options.techs ?? undefined,
        tips: options.tips ?? undefined,
        examples: options.examples ?? [],
        config: options.config ?? '',
    };
};
