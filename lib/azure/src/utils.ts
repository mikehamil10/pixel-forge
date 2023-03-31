import {
  BlobSASPermissions,
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from '@azure/storage-blob';

export const azureAccountName = process.env.AZURE_ACCOUNT_NAME;
export const azureContainerName = process.env.AZURE_CONTAINER_NAME;
const azureAccountKey = process.env.AZURE_ACCOUNT_KEY;
const azureSASExpiry = parseInt(process.env.AZURE_SAS_EXPIRY);

const sharedKeyCredential = new StorageSharedKeyCredential(
  azureAccountName,
  azureAccountKey,
);

const blobServiceClient = new BlobServiceClient(
  `https://${azureAccountName}.blob.core.windows.net`,
  sharedKeyCredential,
);

export const generateSASToken = () => {
  const containerClient =
    blobServiceClient.getContainerClient(azureContainerName);

  const permissions = new BlobSASPermissions();
  permissions.read = true;
  permissions.write = true;
  permissions.create = true;

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions,
      expiresOn: new Date(new Date().valueOf() + azureSASExpiry),
    },
    sharedKeyCredential,
  ).toString();

  return sasToken;
};
