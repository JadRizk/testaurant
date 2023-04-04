import { Configuration, OpenAIApi } from 'openai';

export const initOpenAi = async (apiKey: string) => {
    const configuration = new Configuration({
        apiKey,
    });

    return new OpenAIApi(configuration);
};
