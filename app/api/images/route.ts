import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();
  const { prompt } = res;

  const response = await fetch(
    `${process.env.AZURE_ENDPOINT_BASE_URL}/api/generateImage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    },
  );

  const textData = await response.text();

  return NextResponse.json(textData);
}
