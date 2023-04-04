export interface iGetPromptArgs {
    content: string;
    fileName: string;
    techs?: string[];
    tips?: string[];
}

export const toList = (items: string[]): string =>
    items.map((item, index) => `${index + 1}. ${item}`).join('\r\n');

export const getGptPrompt = ({
    content,
    fileName,
    techs,
    tips,
}: iGetPromptArgs): string => {
    let prompt = `I need unit tests for a file called ${fileName}`;

    if (techs?.length) {
        prompt += ` using the following technologies: 
      ${toList(techs)}
    `;
    }

    if (tips?.length) {
        prompt += `Here are some tips: 
      ${toList(tips)}
    `;
    }

    prompt +=
        "Your answer should be only the code block. Start your response with ``` directly and end it with ``` only, don't add any more text.";

    prompt += `Here is the file content: 
    \`\`\`
    ${content}
    \`\`\`
  `;

    return prompt;
};
