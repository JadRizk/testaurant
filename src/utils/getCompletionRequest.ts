import { type CreateChatCompletionRequest } from 'openai';

export type IModel = 'gpt-3.5-turbo' | 'gpt-3.5-turbo-0301' | 'gpt-4';

export enum ERole {
    User = 'user',
    System = 'system',
    Assistant = 'assistant',
}

export interface IMessage {
    role: ERole;
    content: string;
}

export type ICompletionRequest = CreateChatCompletionRequest;

// Todo: refactor
export const getCompletionRequest = (
    model: IModel,
    prompt: string,
    examples: IMessage[]
): ICompletionRequest => {
    const systemMessage =
        'You are an assistant that provides unit tests for a given file.';

    return {
        model,
        messages: [
            { role: ERole.System, content: systemMessage },
            ...examples,
            { role: ERole.User, content: prompt },
        ],
    };
};
