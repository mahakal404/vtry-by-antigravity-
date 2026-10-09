import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const apiKey = process.env.LIGHTX_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const statusResponse = await fetch('https://api.lightxeditor.com/external/api/v1/order-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({ orderId })
    });

    const statusData = await statusResponse.json();
    const currentStatus = statusData.body?.status;

    if (currentStatus === 'active' || statusData.body?.status === 'completed' || statusData.body?.status === 'success' || statusData.statusCode === 2000) {
      const output = statusData.body?.output;
      if (output) {
        return NextResponse.json({ status: 'completed', result: output });
      } else {
        return NextResponse.json({ status: 'processing' });
      }
    } 

    if (currentStatus === 'FAIL' || statusData.statusCode === 5041 || statusData.message === 'INVALID_PROMPTS_DETECTED') {
      return NextResponse.json(
        { status: 'failed', error: "Safety Filter Triggered", details: "The AI detected potentially unsafe content." },
        { status: 400 }
      );
    }
    
    if (currentStatus === 'failed') {
      return NextResponse.json(
        { status: 'failed', error: 'LightX generation task failed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: currentStatus || 'processing' });

  } catch (error) {
    console.error('Check Status API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
