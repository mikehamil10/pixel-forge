import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { openAI } from '../lib/open-ai';

export async function getChatGPTSuggestion(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const response = await openAI.createCompletion({
    model: 'text-davinci-003',
    prompt:
      'Write a random text prompt for DALL-E to generate an image from. This prompt will be shown to the user, include details such as the genre and what type of painting it should be. Options can include: oil panting, watercolor, photo-realistic, abstract, modern, pop art, black & white, etc. Do not wrap the answer in quotes.',
    max_tokens: 100,
    temperature: 0.8,
  });

  context.log(`Http function processed request for url "${request.url}"`);

  const responseText = response.data.choices[0].text;
  return { body: responseText };
}

app.http('getChatGPTSuggestion', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: getChatGPTSuggestion,
});
