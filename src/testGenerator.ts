import { type IExample } from './utils/getCommandOptions';
import { getGptPrompt } from './utils/getGptPrompt';
import { getExampleMessages } from './utils/getExampleMessages';
import {
    getCompletionRequest,
    type ICompletionRequest,
    type IModel,
} from './utils/getCompletionRequest';
import { readFile } from './utils/readFile';
import { type OpenAIApi } from 'openai';
import { initOpenAi } from './utils/initOpenAi';
import { writeToFile } from './utils/writeToFile';
import { errorLog, infoLog } from './console-logger';

export interface ITestGeneratorProps {
    inputFile: string;
    outputFile: string;
    apiKey: string;
    model: IModel;
    techs?: string[];
    tips?: string[];
    examples?: IExample[];
    config?: string;
}

export const getTestContent = async (
    completionRequest: ICompletionRequest,
    prompt: string,
    openai: OpenAIApi
): Promise<string | undefined> => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            temperature: 0,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        // remove lines that start with ```
        const regex = /^```.*$/gm;

        const messageContent = response?.data?.choices[0]?.text;

        if (messageContent) return messageContent.replace(regex, '');
    } catch (err) {
        console.error(`Error generating tests: ${err}`);
        return undefined;
    }
};

export const testGenerator = async ({
    inputFile,
    outputFile,
    apiKey,
    model,
    examples,
    techs,
    tips,
}: ITestGeneratorProps) => {
    infoLog(`Reading input file...`);
    const content = readFile(inputFile);

    if (!content) {
        errorLog(`Error reading file: ${inputFile}`);
        process.exit(1);
    }

    infoLog(`Generating tests...`);

    const openai = await initOpenAi(apiKey);

    const promptArgs = {
        content,
        fileName: inputFile,
        techs: techs ?? [''],
        tips: tips ?? [''],
    };

    const prompt = getGptPrompt(promptArgs);
    const exampleMessages = getExampleMessages(promptArgs, examples);

    const completionRequest = getCompletionRequest(
        model,
        prompt,
        exampleMessages
    );

    const testContent = await getTestContent(completionRequest, prompt, openai);

    if (!testContent) {
        errorLog(`Error generating tests for file: ${inputFile}`);
        process.exit(1);
    }

    writeToFile(outputFile, testContent);
};
