export async function GET(request: Request) {
  const response = await fetch(
    'http://127.0.0.1:3001/api/getChatGPTSuggestion',
    {
      cache: 'no-store',
    },
  );

  const textData = await response.text();

  return new Response(JSON.stringify(textData.trim()), { status: 200 });
}
