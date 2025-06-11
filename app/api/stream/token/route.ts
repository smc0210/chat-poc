import { StreamClient } from '@stream-io/node-sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    const apiSecret = process.env.STREAM_SECRET_KEY;

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Stream API key or secret not set' }, { status: 500 });
    }

    const client = new StreamClient(apiKey, apiSecret);
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60; // Token valid for 1 hour
    const issued = Math.floor(Date.now() / 1000) - 60;
    const token = client.createToken(userId, exp, issued);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error creating Stream token:', error);
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
  }
} 