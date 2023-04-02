import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import { openAI } from '../lib/open-ai';
import {
  azureAccountName,
  azureContainerName,
  generateSASToken,
} from '../utils';
import { BlobServiceClient } from '@azure/storage-blob';
import { CreateImageRequest } from 'openai';

interface GenerateImageRequest {
  prompt: string;
}

export async function generateImage(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const { prompt } = (await request.json()) as GenerateImageRequest;

  const response = await openAI.createImage({
    prompt: prompt,
    n: 1,
    size: '1024x1024',
  } as CreateImageRequest);
  const imageUrl = response.data.data[0].url;
  const res = await fetch(imageUrl);
  const blob = await res.arrayBuffer();

  const token = generateSASToken();

  const blobServiceClient = new BlobServiceClient(
    `https://${azureAccountName}.blob.core.windows.net?${token}`,
  );

  const containerClient =
    blobServiceClient.getContainerClient(azureContainerName);

  const newFileName = `${prompt}_${new Date().getTime()}.png`;

  try {
    const blockBlobClient = containerClient.getBlockBlobClient(newFileName);
    await blockBlobClient.uploadData(blob);

    return { body: 'success' };
  } catch (error: any) {
    context.error('Error uploading file:', error.message);
    return { body: `error: ${error.message}` };
  }
}

app.http('generateImage', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: generateImage,
});
