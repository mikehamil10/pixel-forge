import { NextResponse } from 'next/server';

const azureEndpoint = process.env.AZURE_ENDPOINT_BASE_URL;

export async function GET() {
  const response = await fetch(`${azureEndpoint}/api/getImages`, {
    next: { revalidate: 15 },
  });

  const data = await response.json();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const res = await request.json();
  const { prompt } = res;

  const response = await fetch(`${azureEndpoint}/api/generateImage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const textData = await response.text();

  return NextResponse.json(textData);
}
