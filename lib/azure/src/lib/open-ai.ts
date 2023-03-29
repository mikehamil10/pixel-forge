import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  organization: process.env.OPEN_AI_ORG_ID,
  apiKey: process.env.OPEN_AI_SECRET_KEY,
});

export const openAI = new OpenAIApi(config);
