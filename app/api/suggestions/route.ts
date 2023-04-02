export async function GET(request: Request) {
  const response = await fetch(
    `${process.env.AZURE_ENDPOINT_BASE_URL}/api/getChatGPTSuggestion`,
    {
      cache: 'no-store',
    },
  );

  const textData = await response.text();

  return new Response(JSON.stringify(textData.trim()), { status: 200 });
}
