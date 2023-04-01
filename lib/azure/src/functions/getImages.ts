import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import {
  azureAccountKey,
  azureAccountName,
  azureContainerName,
  generateSASToken,
} from '../utils';

const sharedKeyCredential = new StorageSharedKeyCredential(
  azureAccountName,
  azureAccountKey,
);

const blobServiceClient = new BlobServiceClient(
  `https://${azureAccountName}.blob.core.windows.net`,
  sharedKeyCredential,
);

export async function getImages(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const containerClient =
    blobServiceClient.getContainerClient(azureContainerName);
  const sasToken = generateSASToken();
  const imageUrls = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    imageUrls.push({
      name: blob.name,
      url: `${containerClient.url}/${blob.name}?${sasToken}`,
    });
  }

  const sortedImageUrls = imageUrls.sort((a, b) => {
    const aTimestamp = a.name.split('_').pop().split('.').shift();
    const bTimestamp = b.name.split('_').pop().split('.').shift();

    return bTimestamp - aTimestamp;
  });

  return {
    jsonBody: sortedImageUrls,
  };
}

app.http('getImages', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: getImages,
});
