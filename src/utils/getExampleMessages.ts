import { getGptPrompt, type iGetPromptArgs } from './getGptPrompt';
import { ERole, type IMessage } from './getCompletionRequest';
import { type IExample } from './getCommandOptions';

export const getExampleMessages = (
    promptArgs: iGetPromptArgs,
    examples?: IExample[]
): IMessage[] => {
    if (!examples) {
        return [];
    }

    return examples.flatMap((g) => {
        const prompt = getGptPrompt({
            ...promptArgs,
            content: g.code,
            fileName: g.fileName,
        });

        return [
            {
                role: ERole.User,
                content: prompt,
            },
            {
                role: ERole.Assistant,
                content: g.tests,
            },
        ];
    });
};
