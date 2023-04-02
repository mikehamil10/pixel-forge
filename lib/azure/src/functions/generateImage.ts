import {
  HttpRequest,
  InvocationContext,
  app,
  type HttpResponseInit,
} from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';
import type { CreateImageRequest } from 'openai';
import { openAI } from '../lib/open-ai';
import {
  azureAccountName,
  azureContainerName,
  generateSASToken,
} from '../utils';

interface GenerateImageRequest {
  prompt: string;
}

export async function generateImage(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  try {
    const { prompt } = (await request.json()) as GenerateImageRequest;

    // Generate image
    const response = await openAI.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    } as CreateImageRequest);

    // Store image in memory as arraybuffer
    const imageResponse = await fetch(response.data.data[0]!.url!);
    if (!imageResponse.ok) {
      throw new Error(`Unexpected response ${imageResponse.statusText}`);
    }

    // Upload blob to Azure
    const blobServiceClient = new BlobServiceClient(
      `https://${azureAccountName}.blob.core.windows.net?${generateSASToken()}`,
    );

    const containerClient =
      blobServiceClient.getContainerClient(azureContainerName);

    const blockBlobClient = containerClient.getBlockBlobClient(
      `${prompt}_${new Date().getTime()}.png`,
    );

    const imageData = await imageResponse!.arrayBuffer();
    await blockBlobClient.uploadData(imageData);

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
