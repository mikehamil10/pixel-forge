import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { generateSASToken } from '../utils';

app.http('generateSASToken', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (
    request: HttpRequest,
    context: InvocationContext,
  ): Promise<HttpResponseInit> => {
    const sasToken = generateSASToken();

    return { body: sasToken };
  },
});
