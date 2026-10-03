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

    // Call to LightX Virtual Try-On API
    const response = await fetch('https://api.lightxeditor.com/external/api/v2/aivirtualtryon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.LIGHTX_API_KEY
      },
      body: JSON.stringify({
        imageUrl: userImageUrl,
        styleImageUrl: clothingImageUrl
      }),
    });

    const data = await response.json();

    // 🕵️‍♂️ THE GOD DEVELOPER SPY LOG: यह लाइन हमें असली बीमारी बताएगी!
    console.log("🚨 LIGHTX RAW RESPONSE:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to generate try-on from LightX API' },
        { status: response.status }
      );
    }

    const resultImage = data?.body?.output || data?.output || data?.result || data?.imageUrl;

    if (!resultImage) {
      return NextResponse.json(
        { error: 'Invalid response format from LightX API' },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: resultImage });

  } catch (error) {
    console.error('Try-On API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}