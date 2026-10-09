import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userImageUrl, clothingImageUrl } = await request.json();
    
    if (!userImageUrl || !clothingImageUrl) {
      return NextResponse.json(
        { error: 'Both user image and clothing image are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIGHTX_API_KEY;
    if (!apiKey) {
      console.error('LightX API key missing in environment');
      return NextResponse.json(
        { error: 'LightX API key not configured on the server.' },
        { status: 500 }
      );
    }

    // 1. Initial Call to LightX Virtual Try-On API to get orderId
    const initResponse = await fetch('https://api.lightxeditor.com/external/api/v2/aivirtualtryon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        imageUrl: userImageUrl,
        styleImageUrl: clothingImageUrl
      }),
    });

    const initData = await initResponse.json();
    console.log("🚨 LIGHTX RAW INIT RESPONSE:", initData);

    if (!initResponse.ok || (initData.statusCode !== 2000 && initData.statusCode !== 200)) {
      return NextResponse.json(
        { error: initData.message || 'Failed to initialize try-on task' },
        { status: initResponse.status || 500 }
      );
    }

    const orderId = initData.body?.orderId || initData.orderId;
    if (!orderId) {
      return NextResponse.json(
        { error: 'Failed to retrieve orderId from LightX API' },
        { status: 500 }
      );
    }

    console.log(`✅ Task initialized successfully. Order ID: ${orderId}`);

    return NextResponse.json({ orderId: orderId });
    
  } catch (error) {
    console.error('Try-On API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}